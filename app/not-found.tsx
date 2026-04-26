import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-4">
          Erro 404
        </div>
        <h1 className="font-serif text-5xl text-navy-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-ink-700 mb-8">
          O conteúdo que você procura pode ter sido movido ou removido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-navy-800 text-cream-50 px-6 py-3 rounded-full font-medium hover:bg-navy-900 transition-colors"
        >
          Voltar à página inicial
        </Link>
      </div>
    </section>
  );
}
