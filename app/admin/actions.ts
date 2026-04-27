"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  createPostFile,
  deletePostFile,
  getPostFromGitHub,
  updatePostFile,
} from "@/lib/github";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeFrontmatter(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function escapeMdxBody(text: string): string {
  return text.replace(/\{/g, "\\{").replace(/\}/g, "\\}");
}

function buildMdx(opts: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover?: string;
  body: string;
}): string {
  const lines = [
    `title: "${escapeFrontmatter(opts.title)}"`,
    `excerpt: "${escapeFrontmatter(opts.excerpt)}"`,
    `date: "${opts.date}"`,
    `category: "${escapeFrontmatter(opts.category || "Artigo")}"`,
  ];
  if (opts.cover) {
    lines.push(`cover: "${escapeFrontmatter(opts.cover)}"`);
  }
  return `---\n${lines.join("\n")}\n---\n\n${escapeMdxBody(opts.body.trim())}\n`;
}

async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
}

export async function publishPost(formData: FormData) {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "Artigo").trim();
  const cover = String(formData.get("cover") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !excerpt || !content) {
    redirect("/admin/new?error=missing");
  }

  const slug = slugify(rawSlug || title);
  if (!slug) {
    redirect("/admin/new?error=slug");
  }

  const date = new Date().toISOString().slice(0, 10);
  const mdx = buildMdx({ title, excerpt, date, category, cover, body: content });

  try {
    await createPostFile(slug, mdx);
  } catch (err) {
    console.error("publishPost failed", err);
    redirect("/admin/new?error=github");
  }

  redirect(`/admin?published=${encodeURIComponent(slug)}`);
}

export async function updatePost(formData: FormData) {
  await requireSession();

  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "Artigo").trim();
  const cover = String(formData.get("cover") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim() || new Date().toISOString().slice(0, 10);

  if (!slug) {
    redirect("/admin");
  }
  if (!title || !excerpt || !content) {
    redirect(`/admin/edit/${slug}?error=missing`);
  }

  let sha: string;
  try {
    const existing = await getPostFromGitHub(slug);
    if (!existing) {
      redirect(`/admin/edit/${slug}?error=notfound`);
    }
    sha = existing.sha;
  } catch (err) {
    console.error("updatePost (fetch) failed", err);
    redirect(`/admin/edit/${slug}?error=github`);
  }

  const mdx = buildMdx({ title, excerpt, date, category, cover, body: content });

  try {
    await updatePostFile(slug, mdx, sha);
  } catch (err) {
    console.error("updatePost (write) failed", err);
    redirect(`/admin/edit/${slug}?error=github`);
  }

  redirect(`/admin?updated=${encodeURIComponent(slug)}`);
}

export async function deletePost(formData: FormData) {
  await requireSession();

  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) {
    redirect("/admin");
  }

  try {
    const existing = await getPostFromGitHub(slug);
    if (!existing) {
      redirect("/admin?error=notfound");
    }
    await deletePostFile(slug, existing.sha);
  } catch (err) {
    console.error("deletePost failed", err);
    redirect("/admin?error=github");
  }

  redirect(`/admin?deleted=${encodeURIComponent(slug)}`);
}

