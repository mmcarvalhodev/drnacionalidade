import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-navy-900 text-cream-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-4">
          Vamos conversar
        </div>
        <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
          O primeiro passo
          <br />é uma conversa <span className="italic text-gold-400">sem compromisso.</span>
        </h2>
        <p className="text-cream-100/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Conte sua situação no WhatsApp e receba uma orientação inicial direta do
          advogado.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-7 py-4 rounded-full font-semibold hover:bg-gold-400 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A12 12 0 003.45 20.42L2 22l1.66-1.42a12 12 0 0016.86-17.1zM12 20a8 8 0 01-4.07-1.11l-.29-.17-3 .8.8-2.92-.18-.3A8 8 0 1112 20z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 border border-cream-50/30 px-7 py-4 rounded-full font-medium hover:bg-cream-50/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            E-mail
          </a>
        </div>
      </div>
    </section>
  );
}
