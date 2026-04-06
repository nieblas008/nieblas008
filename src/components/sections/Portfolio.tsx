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
            {/* Project Image / Background fallback */}
            {p.image_url ? (
              <div className="absolute inset-0">
                <img 
                  src={p.image_url} 
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 group-hover:from-foreground/10 group-hover:to-foreground/20 transition-colors duration-500" />
            )}

            {/* Minimalist Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10">
              <div className="flex justify-end items-start">
                {p.project_url && (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#000099] to-[#0000FF] p-[1.5px] opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md shadow-[#0000FF]/20">
                    <div className="w-full h-full bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>
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
