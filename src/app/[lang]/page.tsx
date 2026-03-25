import { getDictionary, Locale } from '@/lib/dictionary';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { createClient } from '@/utils/supabase/server';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Services dict={dict.services} />
      {projects && projects.length > 0 && <Portfolio dict={dict.portfolio} projects={projects} />}
      {testimonials && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <Contact dict={dict.contact} />
    </>
  );
}
