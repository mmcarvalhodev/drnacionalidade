import { site } from "@/lib/site";

const services = [
  {
    title: "Nacionalidade portuguesa",
    body: "Para descendentes, cônjuges e residentes legais há mais de 7 anos. Processo conduzido na íntegra, do levantamento documental ao registro.",
    icon: (
      <>
        <path d="M5 8a7 7 0 1114 0A7 7 0 015 8z" />
        <path d="M9 14l-2 7 5-3 5 3-2-7" />
      </>
    ),
  },
  {
    title: "Transcrição de casamento",
    body: "Reconhecimento do seu casamento brasileiro em Portugal, requisito essencial para nacionalidade por casamento e união estável.",
    icon: (
      <>
        <path d="M16 11V7a4 4 0 10-8 0v4" />
        <rect x="5" y="11" width="14" height="10" rx="2" />
      </>
    ),
  },
  {
    title: "Homologação de sentença",
    body: "Validação em Portugal de sentenças estrangeiras — divórcios, adoções, inventários — para que produzam efeitos jurídicos.",
    icon: (
      <>
        <path d="M3 7h18M3 12h18M3 17h12" />
      </>
    ),
  },
  {
    title: "Documentação completa",
    body: "Levantamento, tradução juramentada, apostila de Haia e protocolo. Você não precisa lidar com cartórios e consulados.",
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  {
    title: "Montagem e protocolo do processo",
    body: "Montagem do dossiê, protocolo junto aos órgãos competentes e acompanhamento integral até a finalização do processo.",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-3">
            Áreas de atuação
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-4">
            Como podemos te ajudar
          </h2>
          <div className="gold-rule w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              className="card-hover bg-cream-50 border border-navy-100 rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-full bg-navy-800 grid place-items-center mb-5">
                <svg
                  className="w-6 h-6 text-gold-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  {s.icon}
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-navy-900 mb-3">{s.title}</h3>
              <p className="text-ink-700 leading-relaxed text-sm">{s.body}</p>
            </article>
          ))}

          <article className="card-hover bg-navy-800 text-cream-50 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl mb-3">Não sabe por onde começar?</h3>
              <p className="text-cream-100/85 leading-relaxed text-sm mb-6">
                Em uma conversa de 15 minutos no WhatsApp, identificamos o caminho certo
                para o seu caso — sem compromisso.
              </p>
            </div>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-400 font-medium text-sm hover:text-gold-500"
            >
              Conversar com o Dr. Renan
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
