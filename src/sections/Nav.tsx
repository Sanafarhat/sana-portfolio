import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { DoodleStar, ScribbleUnderline, SparkleBurst } from "../components/Doodles";

const LINKS = ["Home", "Projects", "About", "Contact"];

const hrefFor = (link: string) => (link === "Home" ? "#top" : `#${link.toLowerCase()}`);

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 md:px-12"
    >
      <a href="#top" data-cursor="grow" className="relative font-display text-xl font-extrabold tracking-tight">
        SANA<span className="text-(--color-accent)">.</span>
        <DoodleStar className="pointer-events-none absolute -right-4 -top-3 h-3.5 w-3.5 rotate-12 text-(--color-gold)" />
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((link) => (
          <a
            key={link}
            href={hrefFor(link)}
            data-cursor="grow"
            className="group relative text-sm font-medium text-(--color-ink)/80 transition-colors hover:text-(--color-accent)"
          >
            {link}
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-2 w-full text-(--color-accent) opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </nav>
      <button
        type="button"
        data-cursor="grow"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-(--color-ink)/25 bg-(--color-canvas)/60 text-(--color-ink) backdrop-blur md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-6 top-[72px] w-56 rounded-3xl border-2 border-dashed border-(--color-ink)/20 bg-(--color-canvas-raised) p-3 shadow-[6px_8px_0_0_oklch(0.10_0.03_290)] md:hidden"
          >
            <SparkleBurst className="pointer-events-none absolute -left-3 -top-3 h-7 w-7 text-(--color-accent)" />
            <nav className="flex flex-col">
              {LINKS.map((link, i) => (
                <a
                  key={link}
                  href={hrefFor(link)}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-3 font-display text-base font-extrabold text-(--color-ink)/90 transition-colors hover:bg-(--color-canvas) hover:text-(--color-accent)"
                >
                  {link}
                  <span className="text-xs text-(--color-ink)/30">0{i + 1}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
