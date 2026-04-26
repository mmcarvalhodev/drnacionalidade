import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-3">
              Artigos
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-navy-900">
              Últimas publicações
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-navy-800 hover:text-navy-900 inline-flex items-center gap-2"
          >
            Ver todos os artigos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-hover bg-cream-50 rounded-2xl overflow-hidden border border-navy-100 block"
            >
              <div className="aspect-[16/10] overflow-hidden bg-navy-100">
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-gold-600 mb-2">
                  {p.category}
                </div>
                <h3 className="font-serif text-xl text-navy-900 mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-700/80 leading-relaxed mb-4">
                  {p.excerpt}
                </p>
                <div className="text-xs text-ink-700/60">
                  {formatDate(p.date)} · {p.readingTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
