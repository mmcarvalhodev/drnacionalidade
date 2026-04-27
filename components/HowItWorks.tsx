const steps = [
  {
    n: "01",
    title: "Análise do caso",
    body: "Conversa inicial gratuita para entender sua situação e definir o caminho legal aplicável.",
  },
  {
    n: "02",
    title: "Plano e proposta",
    body: "Apresentação clara dos documentos e honorários — sem surpresas no meio do caminho.",
  },
  {
    n: "03",
    title: "Tramitação",
    body: "Conduzimos o processo junto aos órgãos portugueses, com atualizações periódicas do andamento.",
  },
  {
    n: "04",
    title: "Cidadania",
    body: "Registro do assento de nascimento e orientação para emissão do cartão de cidadão e passaporte.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-navy-900 text-cream-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-3">
            Processo transparente
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Como funciona</h2>
          <div className="gold-rule w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="font-serif text-5xl md:text-6xl text-gold-500/40 mb-2">{s.n}</div>
              <h3 className="font-serif text-xl mb-2 text-cream-50">{s.title}</h3>
              <p className="text-sm text-cream-100/75 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
