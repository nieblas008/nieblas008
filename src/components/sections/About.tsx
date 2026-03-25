export function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="py-32 px-6 w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
            {dict.headline}
          </h2>
          <div className="w-20 h-1 bg-foreground/20 rounded-full" />
          <p className="text-lg md:text-xl text-foreground/70 font-sans leading-relaxed">
            {dict.copy}
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-foreground/5 blur-3xl -z-10 rounded-full" />
          <div className="aspect-square liquid-glass flex flex-col items-center justify-center p-8 space-y-6">
            <div className="w-32 h-32 rounded-full border border-foreground/10 bg-gradient-to-tr from-foreground/10 to-transparent flex items-center justify-center">
              <span className="text-5xl">👨‍💻</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium font-serif">Premium Web Engineering</h3>
              <p className="text-sm text-foreground/60 mt-2">Next.js • Tailwind • Python • C++</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
