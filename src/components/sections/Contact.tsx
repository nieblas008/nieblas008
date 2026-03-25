"use client";

import { Mail, Calendar } from "lucide-react";
import { useState } from "react";

export function Contact({ dict }: { dict: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:dev.nieblas@icloud.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-32 px-6 w-full max-w-5xl mx-auto mb-20">
      <div className="liquid-glass p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 blur-[100px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
              {dict.headline}
            </h2>
            <div className="w-20 h-1 bg-foreground/20 rounded-full" />
            
            <div className="pt-8 flex flex-col gap-4">
              <a 
                href="mailto:contact@example.com"
                className="flex items-center gap-4 p-5 liquid-glass hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                <div className="bg-foreground/10 p-3 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{dict.emailUs}</div>
                  <div className="text-sm text-foreground/60">contact@example.com</div>
                </div>
              </a>

              <button className="flex items-center gap-4 p-5 liquid-glass hover:bg-foreground/5 transition-colors text-left w-full cursor-pointer">
                <div className="bg-foreground/10 p-3 rounded-full">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{dict.bookCall}</div>
                  <div className="text-sm text-foreground/60">Calendly Integration</div>
                </div>
              </button>
            </div>
          </div>

          <form className="space-y-6 flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium px-2">{dict.form.name}</label>
              <input 
                id="name"
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium px-2">{dict.form.email}</label>
              <input 
                id="email"
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium px-2">{dict.form.message}</label>
              <textarea 
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all backdrop-blur-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-8 bg-foreground text-background font-medium rounded-2xl hover:scale-[1.02] transition-transform duration-300 mt-4 cursor-pointer"
            >
              {dict.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
