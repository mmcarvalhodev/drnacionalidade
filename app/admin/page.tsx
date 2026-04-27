import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import DeletePostButton from "./DeletePostButton";

const NOTICES: Record<string, (slug: string) => string> = {
  published: (slug) =>
    `Artigo "${slug}" enviado ao GitHub. O Vercel publica em alguns segundos.`,
  updated: (slug) =>
    `Artigo "${slug}" atualizado. Aguarde alguns segundos para o site ser atualizado.`,
  deleted: (slug) =>
    `Artigo "${slug}" removido. Aguarde alguns segundos para sair do ar.`,
};

const ERRORS: Record<string, string> = {
  github: "Falha ao falar com o GitHub. Tente novamente.",
  notfound: "Artigo não encontrado no GitHub.",
};

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{
    published?: string;
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
}) {
  const sp = await searchParams;
  const posts = getAllPosts();

  const noticeKey = sp.published
    ? "published"
    : sp.updated
      ? "updated"
      : sp.deleted
        ? "deleted"
        : null;
  const noticeSlug = sp.published ?? sp.updated ?? sp.deleted ?? "";
  const errorMsg = sp.error ? ERRORS[sp.error] : null;

  return (
    <div>
      {noticeKey && (
        <div className="mb-6 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {NOTICES[noticeKey](noticeSlug)}
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-navy-900">
          Artigos publicados
        </h2>
        <Link
          href="/admin/new"
          className="rounded bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-900"
        >
          Novo artigo
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="rounded border border-stone-200 bg-white px-4 py-6 text-sm text-stone-600">
          Nenhum artigo encontrado.
        </p>
      ) : (
        <ul className="divide-y divide-stone-200 rounded border border-stone-200 bg-white">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/blog/${p.slug}`}
                  className="block truncate font-medium text-navy-900 hover:text-navy-700"
                >
                  {p.title}
                </Link>
                <p className="mt-0.5 text-xs text-stone-500">
                  {p.category} · {formatDate(p.date)} ·{" "}
                  <span className="text-stone-400">{p.slug}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/edit/${p.slug}`}
                  className="text-xs text-navy-700 hover:underline"
                >
                  Editar
                </Link>
                <DeletePostButton slug={p.slug} title={p.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
