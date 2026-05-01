import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur border-b border-navy-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-r.png"
            alt="R. Nacionalidade — Dr. Renan Mattos"
            width={64}
            height={64}
            priority
            className="rounded-md"
          />
          <div className="leading-tight">
            <div className="font-serif text-lg text-navy-900">{site.name}</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-gold-600">
              {site.tagline}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-700">
          <Link href="/#servicos" className="hover:text-navy-800">Serviços</Link>
          <Link href="/#requisitos" className="hover:text-navy-800">Requisitos</Link>
          <Link href="/#sobre" className="hover:text-navy-800">Sobre</Link>
          <Link href="/#faq" className="hover:text-navy-800">FAQ</Link>
          <Link href="/blog" className="hover:text-navy-800">Artigos</Link>
        </nav>

        <WhatsAppCTA className="hidden md:inline-flex items-center gap-2 bg-navy-800 text-cream-50 px-4 py-2 rounded-full text-sm font-medium hover:bg-navy-900 transition-colors">
          Falar agora
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </WhatsAppCTA>
      </div>
    </header>
  );
}
