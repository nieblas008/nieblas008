export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 px-6 border-t border-foreground/10 text-center">
      <p className="font-sans text-sm text-foreground/60">
        © {year} Premium Web Engineering. All rights reserved.
      </p>
    </footer>
  );
}
