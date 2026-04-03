"use client";

import { Mail, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/admin/(dashboard)/actions";

export function Contact({ dict }: { dict: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      
      const result = await submitContactForm(data);
      if (result?.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 w-full max-w-5xl mx-auto mb-20">
      <div className="liquid-glass p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 blur-[100px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col h-full">
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
              {dict.headline}
            </h2>
            <div className="w-20 h-1 bg-foreground/20 rounded-full mt-8" />
            
            <div className="pt-8 flex flex-col gap-4 mt-auto">
              <a 
                href="mailto:dev.nieblas@icloud.com"
                className="flex items-center gap-4 p-5 liquid-glass hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                <div className="bg-foreground/10 p-3 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{dict.emailUs}</div>
                  <div className="text-sm text-foreground/60">dev.nieblas@icloud.com</div>
                </div>
              </a>

              {/* 
              <button className="flex items-center gap-4 p-5 liquid-glass hover:bg-foreground/5 transition-colors text-left w-full cursor-pointer">
                <div className="bg-foreground/10 p-3 rounded-full">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{dict.bookCall}</div>
                  <div className="text-sm text-foreground/60">Calendly Integration</div>
                </div>
              </button>
              */}
            </div>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="bg-green-500/10 p-6 rounded-full mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4 italic">Message Sent!</h3>
              <p className="text-foreground/60 max-w-sm mx-auto">
                Thank you for reaching out, Ricardo. I'll get back to you directly via email as soon as possible.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-sm font-medium underline underline-offset-4 hover:text-foreground/80 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-6 flex flex-col justify-center" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <input 
                  id="name"
                  type="text" 
                  placeholder={dict.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all backdrop-blur-sm placeholder:text-foreground/40 disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <input 
                  id="email"
                  type="email" 
                  placeholder={dict.form.email}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all backdrop-blur-sm placeholder:text-foreground/40 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <textarea 
                  id="message"
                  rows={4}
                  placeholder={dict.form.message}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all backdrop-blur-sm resize-none placeholder:text-foreground/40 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-foreground text-background font-medium rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-black/5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  dict.form.submit
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
