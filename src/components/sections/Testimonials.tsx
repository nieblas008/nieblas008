export function Testimonials({ testimonials }: { testimonials: any[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 px-6 w-full max-w-5xl mx-auto transition-all duration-700">
      <div className="text-center mb-16 space-y-6">
        <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
          What Clients Say
        </h2>
        <div className="w-20 h-1 bg-foreground/20 rounded-full mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="liquid-glass p-8 space-y-6 transition-transform hover:-translate-y-1">
            <div className="flex gap-1 text-foreground/40">
              ★★★★★
            </div>
            <p className="font-serif italic text-lg leading-relaxed text-foreground/70">
              "{t.content}"
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/50 font-serif font-bold">
                {t.author_name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{t.author_name}</div>
                {t.author_title && <div className="text-sm text-foreground/50">{t.author_title}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
