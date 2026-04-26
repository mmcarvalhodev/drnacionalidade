import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Artigos sobre nacionalidade portuguesa",
  description:
    "Análises e orientações sobre o processo de aquisição de nacionalidade portuguesa, transcrição de casamento e residência em Portugal.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-navy-900 text-cream-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-4">
            Artigos
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 leading-tight">
            Sobre nacionalidade<br />e direito português
          </h1>
          <div className="gold-rule w-24 mx-auto mt-6" />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-center text-ink-700/70">Em breve novos artigos.</p>
          ) : (
            <div className="space-y-10">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid md:grid-cols-12 gap-6 items-start"
                >
                  <div className="md:col-span-4 aspect-[16/10] rounded-xl overflow-hidden bg-navy-100">
                    {p.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : null}
                  </div>
                  <div className="md:col-span-8">
                    <div className="text-xs uppercase tracking-widest text-gold-600 mb-2">
                      {p.category}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-ink-700 leading-relaxed mb-3">{p.excerpt}</p>
                    <div className="text-xs text-ink-700/60">
                      {formatDate(p.date)} · {p.readingTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
