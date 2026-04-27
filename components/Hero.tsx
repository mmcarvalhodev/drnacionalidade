import Image from "next/image";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero-grad text-cream-50 relative">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-5">
            Advocacia • Atuação em todos os países
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-5">
            A sua cidadania portuguesa,<br />
            conduzida por uma equipe<br />
            <span className="text-gold-400 italic">luso-brasileira.</span>
          </h1>
          <p className="text-base md:text-lg text-cream-100/85 max-w-xl mb-8 leading-relaxed">
            Equipe especializada em direito da nacionalidade portuguesa, liderada por
            advogado luso-brasileiro. Atendimento próximo, do primeiro contato à entrega
            do passaporte.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-6 py-3 rounded-full font-semibold hover:bg-gold-400 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A12 12 0 003.45 20.42L2 22l1.66-1.42a12 12 0 0016.86-17.1zM12 20a8 8 0 01-4.07-1.11l-.29-.17-3 .8.8-2.92-.18-.3A8 8 0 1112 20zm4.45-5.6c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.55.12-.62.78-.76.94-.28.18-.52.06a6.6 6.6 0 01-1.93-1.2 7.36 7.36 0 01-1.34-1.66c-.14-.24 0-.36.1-.48s.24-.28.36-.42a1.6 1.6 0 00.24-.4.45.45 0 000-.42c-.06-.12-.55-1.32-.75-1.8s-.4-.4-.55-.4h-.46a.9.9 0 00-.65.3 2.7 2.7 0 00-.85 2c0 1.18.86 2.32.98 2.48s1.7 2.6 4.13 3.64a14.2 14.2 0 001.42.52 3.4 3.4 0 001.55.1 2.55 2.55 0 001.66-1.18 2.06 2.06 0 00.14-1.18c-.06-.1-.22-.16-.46-.28z" />
              </svg>
              WhatsApp direto
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 border border-cream-50/40 text-cream-50 px-6 py-3 rounded-full font-medium hover:bg-cream-50/10 transition-colors"
            >
              Conhecer os serviços
            </a>
          </div>
        </div>

        <div className="md:col-span-5 hidden md:block">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl bg-navy-800 relative">
              <Image
                src="/images/escritorio.png"
                alt="Equipe do escritório R. Nacionalidade"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
