import { motion } from "motion/react";
import { Star, Sparkles, Clapperboard, ChevronDown } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import {
  ScribbleUnderline,
  DashedArrow,
  DoodleStar,
  HalftoneDots,
  SparkleBurst,
  Squiggle,
  ComicBurst,
} from "../components/Doodles";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-32 pb-24 md:px-12 md:pt-40">
      <div className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-(--color-violet)/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-52 h-72 w-72 rounded-full bg-(--color-accent)/15 blur-3xl" />
      <HalftoneDots className="pointer-events-none absolute left-4 bottom-10 h-28 w-44 text-(--color-cyan) opacity-40 md:left-10" />
      <SparkleBurst className="pointer-events-none absolute right-[8%] top-16 h-8 w-8 text-(--color-gold) opacity-70 md:right-[28%]" />
      <DoodleStar className="pointer-events-none absolute left-[6%] top-1/2 h-5 w-5 text-(--color-coral) opacity-70" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2"
      >
        <div>
          <motion.div
            variants={item}
            className="relative mb-4 inline-flex items-center gap-2 rounded-full bg-(--color-canvas-raised) px-4 py-1.5 text-sm font-medium text-(--color-ink)/80"
          >
            <Sparkles size={14} className="text-(--color-accent)" />
            Hey, I&rsquo;m
            <Squiggle className="pointer-events-none absolute -bottom-4 left-2 h-3 w-16 text-(--color-ink)/25" />
          </motion.div>

          <motion.h1
            variants={item}
            className="relative font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
          >
            SANA
            <ScribbleUnderline className="absolute -bottom-3 left-0 h-4 w-48 text-(--color-accent) sm:w-56 md:w-64" />
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-md text-lg font-medium text-(--color-ink)/80">
            Full Stack Developer&nbsp;&middot;&nbsp;AI &amp; ML Student&nbsp;&middot;&nbsp;Problem Solver
          </motion.p>

          <motion.div variants={item} className="relative mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => {
                document.getElementById("showreel")?.scrollIntoView({ behavior: "smooth" });
                window.dispatchEvent(new Event("play-showreel"));
              }}
              className="flex items-center gap-2 rounded-full bg-(--color-accent) px-7 py-4 font-display text-sm font-extrabold text-(--color-canvas) shadow-[4px_6px_0_0_oklch(0.16_0.04_290)] transition-transform hover:-translate-y-0.5"
            >
              <Clapperboard size={16} />
              Watch Intro
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border-2 border-(--color-ink)/25 px-7 py-4 font-display text-sm font-extrabold text-(--color-ink) transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
            >
              View Projects
            </MagneticButton>
            <DashedArrow className="pointer-events-none absolute -right-16 top-1/2 hidden h-10 w-20 -translate-y-1/2 rotate-6 text-(--color-ink)/40 lg:block" />
          </motion.div>
        </div>

        <motion.div variants={item} className="relative flex justify-center md:justify-end">
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-(--color-violet)/35 blur-3xl" />
          <HalftoneDots className="pointer-events-none absolute -right-4 bottom-0 h-24 w-40 text-(--color-gold) opacity-40" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-sm"
          >
            <img
              src="/img/sana-cutout.png"
              alt="Illustrated cartoon character of Sana"
              className="relative z-10 w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
            />
            <motion.div
              animate={{ rotate: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 right-2 z-20 rounded-2xl bg-(--color-cyan) px-4 py-2 font-display text-xs font-extrabold text-(--color-canvas) shadow-[3px_4px_0_0_oklch(0.16_0.04_290)]"
            >
              Let&rsquo;s build<br />something awesome!
            </motion.div>
            <Star className="absolute -left-6 top-10 z-20 text-(--color-gold)" size={28} fill="currentColor" />
            <Sparkles className="absolute bottom-6 -right-2 z-20 text-(--color-accent)" size={24} />
            <ComicBurst
              color="var(--color-coral)"
              className="absolute -left-8 bottom-16 z-20 hidden h-16 w-16 rotate-[-8deg] text-[10px] font-display font-extrabold text-(--color-canvas) sm:flex"
            >
              &lt;/&gt;
            </ComicBurst>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#showreel"
        data-cursor="grow"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-(--color-ink)/50 md:flex"
        aria-label="Scroll down"
      >
        <span className="font-display text-xs font-bold uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
