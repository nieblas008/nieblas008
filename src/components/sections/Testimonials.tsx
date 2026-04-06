import { Star, StarHalf } from "lucide-react";

export function Testimonials({ testimonials }: { testimonials: any[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  const renderStars = (rating: number = 5) => {
    const stars = [];
    const fullStars = Math.round(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`star-${i}`} 
          className="w-5 h-5 drop-shadow-sm" 
          stroke="url(#star-gradient)" 
          fill="url(#star-gradient)" 
        />
      );
    }

    const remaining = 5 - fullStars;
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <Star 
          key={`star-empty-${i}`} 
          className="w-5 h-5 opacity-20" 
          stroke="url(#star-gradient)" 
        />
      );
    }

    return stars;
  };

  return (
    <section id="testimonials" className="relative py-32 px-6 w-full max-w-5xl mx-auto transition-all duration-700">
      {/* Required for the gradient effect on stars */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000099" />
            <stop offset="100%" stopColor="#0000FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center mb-16 space-y-6">
        <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
          What Clients Say
        </h2>
        <div className="w-20 h-1 bg-foreground/20 rounded-full mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="liquid-glass p-8 space-y-6 transition-transform hover:-translate-y-1">
            <div className="flex gap-1">
              {renderStars(t.rating)}
            </div>
            <p className="font-serif italic text-lg leading-relaxed text-foreground/70">
              "{t.content}"
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
              <div className="w-12 h-12 rounded-full border border-foreground/10 overflow-hidden bg-foreground/5 flex items-center justify-center">
                {t.author_image_url ? (
                  <img 
                    src={t.author_image_url} 
                    alt={t.author_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-foreground/50 font-serif font-bold text-lg">
                    {t.author_name.charAt(0)}
                  </span>
                )}
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
