import { CheckCircle2 } from "lucide-react";

export function Services({ dict }: { dict: any }) {
  return (
    <section id="services" className="py-32 px-6 w-full max-w-6xl mx-auto">
      <div className="text-center mb-20 space-y-6">
        <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">
          {dict.headline}
        </h2>
        <div className="w-24 h-1 bg-foreground/20 rounded-full mx-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {dict.items.map((item: any, i: number) => (
          <div 
            key={i} 
            className="liquid-glass p-10 hover:bg-foreground/[0.03] transition-colors duration-500 group flex flex-col h-full"
          >
            <div className="mb-6 bg-foreground/5 w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-medium mb-4">{item.title}</h3>
            <p className="text-foreground/70 leading-relaxed font-sans">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
