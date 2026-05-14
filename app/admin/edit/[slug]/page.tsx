import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { getPostFromGitHub } from "@/lib/github";
import { updatePost } from "../../actions";
import DeletePostButton from "../../DeletePostButton";
import CoverImageUpload from "../../CoverImageUpload";

export const metadata = {
  title: "Editar artigo",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  missing: "Preencha título, resumo e conteúdo.",
  github: "Falha ao salvar no GitHub. Tente novamente.",
  notfound: "Artigo não encontrado no GitHub.",
};

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;

  const existing = await getPostFromGitHub(slug);
  if (!existing) notFound();

  const { data, content } = matter(existing.mdx);
  const title = String(data.title ?? "");
  const excerpt = String(data.excerpt ?? "");
  const category = String(data.category ?? "Artigo");
  const cover = data.cover ? String(data.cover) : "";
  const date = String(data.date ?? "");
  const body = content.replace(/\\\{/g, "{").replace(/\\\}/g, "}").trim();

  const errorMessage = error ? ERROR_MESSAGES[error] : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-navy-900">
          Editar artigo
        </h2>
        <Link
          href="/admin"
          className="text-sm text-stone-600 hover:text-navy-700"
        >
          ← Voltar
        </Link>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <form
        action={updatePost}
        className="space-y-5 rounded border border-stone-200 bg-white p-6 shadow-sm"
      >
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="date" value={date} />

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-stone-800"
          >
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={title}
            className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-stone-800">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              disabled
              className="mt-1 block w-full rounded border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-500"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-stone-800"
            >
              Categoria
            </label>
            <input
              id="category"
              name="category"
              type="text"
              defaultValue={category}
              className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-stone-800"
          >
            Resumo
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            required
            defaultValue={excerpt}
            className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-800 mb-2">
            Imagem de capa{" "}
            <span className="font-normal text-stone-500">(opcional)</span>
          </label>
          <CoverImageUpload name="cover" defaultValue={cover} />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-stone-800"
          >
            Conteúdo
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            required
            defaultValue={body}
            className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
          <p className="mt-1 text-xs text-stone-500">
            Escreva o texto do artigo. Separe parágrafos por uma linha em branco.
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <div />
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="rounded bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-900"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 flex items-center justify-between rounded border border-red-200 bg-red-50/50 p-4">
        <div>
          <h3 className="text-sm font-semibold text-red-900">Zona de risco</h3>
          <p className="text-xs text-red-700">
            Excluir o artigo permanentemente do site.
          </p>
        </div>
        <DeletePostButton slug={slug} title={title} variant="danger" />
      </div>
    </div>
  );
}
