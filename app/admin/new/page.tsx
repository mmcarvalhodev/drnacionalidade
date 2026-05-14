import Link from "next/link";
import { publishPost } from "../actions";
import CoverImageUpload from "../CoverImageUpload";

export const metadata = {
  title: "Novo artigo",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  missing: "Preencha título, resumo e conteúdo.",
  slug: "Não foi possível gerar um slug válido. Informe manualmente.",
  github: "Falha ao enviar para o GitHub. Verifique o token e tente novamente.",
};

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-navy-900">
          Novo artigo
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
        action={publishPost}
        className="space-y-5 rounded border border-stone-200 bg-white p-6 shadow-sm"
      >
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
            className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-stone-800"
            >
              Slug{" "}
              <span className="font-normal text-stone-500">
                (opcional — gerado a partir do título)
              </span>
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="ex: novidades-cidadania-2026"
              className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
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
              defaultValue="Artigo"
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
            className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-800 mb-2">
            Imagem de capa{" "}
            <span className="font-normal text-stone-500">(opcional)</span>
          </label>
          <CoverImageUpload name="cover" />
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
            placeholder="Escreva o texto do artigo aqui..."
            className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
          <p className="mt-1 text-xs text-stone-500">
            Escreva o texto do artigo. Separe parágrafos por uma linha em branco.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-stone-200 pt-4">
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
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
