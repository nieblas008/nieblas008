"use client";

import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher({ currentLang, label }: { currentLang: string, label: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "es" : "en";
    const newPath = pathname?.replace(`/${currentLang}`, `/${nextLang}`) || `/${nextLang}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 font-sans text-sm font-medium tracking-wider rounded-full cursor-pointer liquid-glass hover:bg-foreground/5 transition-colors"
      aria-label="Switch language"
    >
      {label}
    </button>
  );
}
