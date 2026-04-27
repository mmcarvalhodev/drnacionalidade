import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ published?: string }>;
}) {
  const { published } = await searchParams;
  const posts = getAllPosts();

  return (
    <div>
      {published && (
        <div className="mb-6 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Artigo <strong>{published}</strong> enviado ao GitHub. O Vercel vai
          publicar em alguns segundos.
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
              <div className="min-w-0">
                <Link
                  href={`/blog/${p.slug}`}
                  className="block truncate font-medium text-navy-900 hover:text-navy-700"
                >
                  {p.title}
                </Link>
                <p className="mt-0.5 text-xs text-stone-500">
                  {p.category} · {formatDate(p.date)}
                </p>
              </div>
              <span className="shrink-0 text-xs text-stone-400">{p.slug}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
