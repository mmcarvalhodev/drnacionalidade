import Image from "next/image";
import { site } from "@/lib/site";

const requisitos = [
  "Ter mais de 18 anos ou ser emancipado de acordo com a lei portuguesa",
  "Residir legalmente em Portugal há pelo menos 7 anos, com título de residência",
  "Conhecer suficientemente a língua portuguesa",
  "Ter ao menos um genitor português(a)",
  "Ser filho ou filha de pessoa portuguesa",
  "Ser neto ou neta de pessoa portuguesa",
  "Estar casado ou viver em união de fato com pessoa portuguesa há mais de 3 anos",
];

export default function Requisitos() {
  return (
    <section id="requisitos" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-navy-100 relative">
            <Image
              src="/images/flag-pt.png"
              alt="Bandeira de Portugal"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-navy-900 text-cream-50 rounded-xl p-5 shadow-xl border border-gold-500/30 max-w-[220px] hidden md:block">
            <div className="text-xs uppercase tracking-widest text-gold-400 mb-1">
              Quem pode pedir
            </div>
            <div className="font-serif text-lg leading-tight">
              Conheça os requisitos para a nacionalidade portuguesa
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-3">
            Requisitos
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy-900 mb-4 leading-tight">
            Quem pode obter<br />a nacionalidade portuguesa
          </h2>
          <div className="gold-rule w-20 mb-6" />
          <p className="text-ink-700 leading-relaxed mb-8">
            A legislação portuguesa prevê diferentes caminhos para a aquisição da
            nacionalidade. Veja se você se enquadra em uma das hipóteses abaixo —
            cada caso tem particularidades próprias.
          </p>

          <ul className="space-y-3">
            {requisitos.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span className="mt-1 grid place-items-center w-5 h-5 rounded-full bg-gold-500/15 shrink-0">
                  <svg
                    className="w-3 h-3 text-gold-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-ink-700 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 bg-navy-50 border border-navy-100 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-sm text-ink-700 leading-relaxed">
              Não tem certeza em qual caminho se encaixa?{" "}
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-800 font-medium underline decoration-gold-500 underline-offset-2 hover:text-navy-900"
              >
                Fale com o Dr. Renan
              </a>{" "}
              — em poucos minutos identificamos a hipótese aplicável ao seu caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
