import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="text-sm text-forest-700 hover:text-forest-900 inline-flex items-center gap-2 mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para os artigos
          </Link>

          <div className="text-xs uppercase tracking-widest text-gold-600 mb-3">
            {post.category}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-forest-900 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="text-sm text-ink-700/60 mb-10">
            {formatDate(post.date)} · {post.readingTime} de leitura
          </div>

          {post.cover ? (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-forest-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
            </div>
          ) : null}

          <div className="prose-custom">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-16 p-8 bg-forest-900 text-cream-50 rounded-2xl text-center">
            <h2 className="font-serif text-2xl mb-3">Tem dúvidas sobre o seu caso?</h2>
            <p className="text-cream-100/80 mb-6">
              Converse diretamente com o Dr. Renan no WhatsApp.
            </p>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 text-forest-900 px-6 py-3 rounded-full font-semibold hover:bg-gold-400 transition-colors"
            >
              Falar no WhatsApp
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
