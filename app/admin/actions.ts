"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { createPostFile } from "@/lib/github";

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

export async function publishPost(formData: FormData) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

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

  const frontmatterLines = [
    `title: "${escapeFrontmatter(title)}"`,
    `excerpt: "${escapeFrontmatter(excerpt)}"`,
    `date: "${date}"`,
    `category: "${escapeFrontmatter(category || "Artigo")}"`,
  ];
  if (cover) {
    frontmatterLines.push(`cover: "${escapeFrontmatter(cover)}"`);
  }

  const mdx = `---\n${frontmatterLines.join("\n")}\n---\n\n${content}\n`;

  try {
    await createPostFile(slug, mdx);
  } catch (err) {
    console.error("publishPost failed", err);
    redirect("/admin/new?error=github");
  }

  redirect(`/admin?published=${encodeURIComponent(slug)}`);
}
