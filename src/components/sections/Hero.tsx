export function Hero({ dict }: { dict: any }) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-foreground/5 rounded-full blur-[120px] -z-10" />

      <div className="liquid-glass p-10 md:p-16 max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[1.1]">
          {dict.headline}
        </h1>
        <p className="text-lg md:text-2xl text-foreground/70 font-sans max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-both">
          {dict.subheadline}
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
          <a href="#contact" className="px-10 py-5 bg-foreground text-background text-lg font-medium rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 shadow-xl">
            {dict.primaryCTA}
          </a>
          <a href="#portfolio" className="px-10 py-5 bg-transparent border-2 border-foreground text-foreground text-lg font-medium rounded-full cursor-pointer hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm hover:shadow-xl">
            {dict.secondaryCTA}
          </a>
        </div>
      </div>
    </section>
  );
}
