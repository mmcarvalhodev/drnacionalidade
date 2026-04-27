export default function About() {
  return (
    <section id="sobre" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-navy-100 bg-navy-100">
            {/* TODO: substituir por foto real do escritório/Dr. Renan */}
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
              alt="Dr. Renan no escritório"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-600 mb-3">
            Quem te atende
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-6 leading-tight">
            Direito da nacionalidade
            <br />
            portuguesa.
          </h2>
          <div className="gold-rule w-20 mb-6" />
          <p className="text-ink-700 leading-relaxed mb-4">
            Dr. Renan Mattos é advogado inscrito na Ordem dos Advogados de Portugal
            (cédula 68801P) e na Ordem dos Advogados do Brasil (RJ 197.344). Possui
            ampla experiência na área, assessorando descendentes, cônjuges e residentes
            brasileiros no processo de aquisição de nacionalidade portuguesa.
          </p>
          <p className="text-ink-700 leading-relaxed mb-8">
            O atendimento é feito diretamente pelo advogado — sem call center, sem
            intermediários. Cada cliente recebe um plano personalizado, com honorários
            definidos antes do início.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-ink-700">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Atendimento bilíngue
            </div>
            <div className="flex items-center gap-2 text-ink-700">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Honorários transparentes
            </div>
            <div className="flex items-center gap-2 text-ink-700">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Acompanhamento integral
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
