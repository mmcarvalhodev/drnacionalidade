const faqs = [
  {
    q: "Quanto tempo demora o processo de nacionalidade?",
    a: "O prazo varia conforme a modalidade. Por casamento ou união estável, normalmente entre 12 e 24 meses. Por residência ou descendência, pode chegar a 30 meses. Damos um prazo realista após a análise inicial.",
  },
  {
    q: "Preciso ir a Portugal para iniciar o processo?",
    a: "Não. A maior parte dos processos pode ser iniciada e conduzida com você no Brasil. Atuamos com procuração e acompanhamos a tramitação localmente em Portugal.",
  },
  {
    q: "Quais documentos são necessários?",
    a: "Depende da modalidade. Em geral: certidões de nascimento e casamento, documento de identidade, comprovantes de residência ou vínculo, e certidões de antecedentes criminais. Enviamos uma lista completa após a análise.",
  },
  {
    q: "Como são cobrados os honorários?",
    a: "Trabalhamos com valores fechados, definidos antes do início do processo. Sem cobrança por hora, sem surpresas. Aceitamos parcelamento em condições combinadas previamente.",
  },
  {
    q: "Meu casamento foi no Brasil. Vale para nacionalidade?",
    a: "Sim, mas o casamento precisa ser transcrito em Portugal antes do pedido de nacionalidade. Nós cuidamos da transcrição e do pedido em sequência.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-3">
            Dúvidas frequentes
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900 mb-4">
            Perguntas que sempre recebemos
          </h2>
          <div className="gold-rule w-24 mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-cream-50 border border-forest-100 rounded-xl px-6 py-5"
            >
              <summary className="flex items-center justify-between gap-4">
                <span className="font-serif text-xl text-forest-900">{f.q}</span>
                <span className="faq-icon text-gold-500 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-ink-700 leading-relaxed text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
