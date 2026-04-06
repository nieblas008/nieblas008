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
          <a href="#contact" className="px-10 py-5 bg-gradient-to-r from-[#000099] to-[#0000FF] text-white border-0 hover:opacity-90 text-lg font-medium rounded-full cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-[#0000FF]/20">
            {dict.primaryCTA}
          </a>
          <a href="#portfolio" className="relative inline-flex rounded-full p-[2px] bg-gradient-to-r from-[#000099] to-[#0000FF] group shadow-sm hover:shadow-xl shadow-[#0000FF]/10 transition-all duration-300">
            <span className="flex w-full items-center justify-center rounded-full bg-background group-hover:bg-transparent px-10 py-5 text-lg font-medium transition-colors duration-300 group-hover:text-white text-foreground">
              {dict.secondaryCTA}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
