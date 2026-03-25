import { ArrowUpRight } from "lucide-react";

export function Portfolio({ dict, projects }: { dict: any, projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-32 px-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">
            {dict.headline}
          </h2>
          <div className="w-24 h-1 bg-foreground/20 rounded-full" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={p.project_url || '#'}
            target={p.project_url ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-foreground/10 bg-foreground/5 cursor-pointer block"
          >
            {/* Minimalist Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-background/50 backdrop-blur-md flex items-center justify-center border border-foreground/10">
                  <span className="font-serif italic font-medium">B.{i + 1}</span>
                </div>
                {p.project_url && (
                  <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-foreground/10 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </div>
                )}
              </div>
              
              <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-foreground drop-shadow-md">{p.title}</h3>
                <p className="text-foreground/80 line-clamp-2 drop-shadow-sm font-serif italic">{p.description}</p>
              </div>
            </div>

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
          </a>
        ))}
      </div>
    </section>
  );
}
