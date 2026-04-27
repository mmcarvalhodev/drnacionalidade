const items = [
  {
    quote:
      "O Dr. Renan tirou todas as minhas dúvidas e conduziu o processo com muito profissionalismo. Saiu mais rápido do que eu esperava.",
    name: "Mariana C.",
    case: "Nacionalidade por casamento",
  },
  {
    quote:
      "Atendimento direto com o advogado, sempre acessível. Recomendo a todos os meus amigos que querem cidadania portuguesa.",
    name: "Eduardo M.",
    case: "Residência há 5 anos",
  },
  {
    quote:
      "Documentação complexa, mas o escritório resolveu tudo. Hoje meu passaporte português está em mãos.",
    name: "Patrícia L.",
    case: "Descendência",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-3">
            Quem já passou por aqui
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy-900 mb-4">
            Depoimentos
          </h2>
          <div className="gold-rule w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure
              key={t.name}
              className="bg-cream-50 rounded-2xl p-8 border border-navy-100"
            >
              <div className="text-gold-500 text-2xl mb-4">★★★★★</div>
              <blockquote className="text-ink-700 leading-relaxed text-sm mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <div className="font-medium text-navy-900">{t.name}</div>
                <div className="text-xs text-ink-700/70">{t.case}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
