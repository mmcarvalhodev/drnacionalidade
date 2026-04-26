import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-forest-900 border-t border-cream-50/10 text-cream-100/70 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo-r.png"
              alt="R. Nacionalidade"
              width={44}
              height={44}
              className="rounded-md ring-1 ring-cream-50/20"
            />
            <div>
              <div className="font-serif text-lg text-cream-50">{site.name}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-gold-400">
                {site.tagline}
              </div>
            </div>
          </div>
          <p className="leading-relaxed">
            Advocacia especializada em nacionalidade portuguesa. Atendimento em Lisboa
            e Rio de Janeiro.
          </p>
        </div>
        <div>
          <div className="text-cream-50 font-medium mb-3">Credenciais</div>
          <ul className="space-y-1">
            <li>OAB Portugal — {site.oab.portugal}</li>
            <li>OAB Brasil — {site.oab.brasil}</li>
            <li>CNPJ {site.cnpj}</li>
          </ul>
        </div>
        <div>
          <div className="text-cream-50 font-medium mb-3">Contato</div>
          <ul className="space-y-1">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold-400">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400"
              >
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="max-w-6xl mx-auto px-6 py-5 text-xs flex flex-wrap gap-3 justify-between text-cream-100/50">
          <span>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</span>
          <span>drnacionalidade.com.br</span>
        </div>
      </div>
    </footer>
  );
}
