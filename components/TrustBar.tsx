import { site } from "@/lib/site";

export default function TrustBar() {
  const items = [
    { label: "OAB Portugal", value: site.oab.portugal },
    { label: "OAB Brasil", value: site.oab.brasil },
    { label: "Atuação", value: "Lisboa & Rio" },
    { label: "Experiência", value: "+10 anos" },
  ];

  return (
    <section className="bg-navy-900 text-cream-50/90 border-t border-gold-500/20">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <div className="text-xs uppercase tracking-widest text-gold-400 mb-1">
              {item.label}
            </div>
            <div className="font-serif text-lg">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
