import { motion } from "motion/react";
import { Code2, Layers, Server, Database, GitBranch, Cpu } from "lucide-react";
import { ScribbleUnderline, DoodleStar, DashedArrow, HalftoneDots, SparkleBurst } from "../components/Doodles";

const SKILLS = [
  { name: "Python · Java · JavaScript · C", icon: Code2, accent: "--color-violet", tilt: "-rotate-3" },
  { name: "React · HTML5 · CSS3 · Bootstrap", icon: Layers, accent: "--color-coral", tilt: "rotate-2" },
  { name: "Node.js · Express · FastAPI", icon: Server, accent: "--color-cyan", tilt: "-rotate-2" },
  { name: "MongoDB · SQL", icon: Database, accent: "--color-gold", tilt: "rotate-3" },
  { name: "Git · GitHub · Vercel · Render · AWS", icon: GitBranch, accent: "--color-accent", tilt: "-rotate-2" },
  { name: "DSA · OOP · DBMS · OS · Networks", icon: Cpu, accent: "--color-violet", tilt: "rotate-2" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { y: 24 },
  show: { y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Skills() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute right-2 bottom-4 h-24 w-40 text-(--color-accent) opacity-25 md:right-12" />
      <DoodleStar className="pointer-events-none absolute left-[5%] top-4 h-5 w-5 text-(--color-cyan) opacity-70" />
      <SparkleBurst className="pointer-events-none absolute right-[6%] top-10 h-6 w-6 text-(--color-coral) opacity-70" />
      <DoodleStar className="pointer-events-none absolute left-[12%] bottom-6 h-4 w-4 rotate-12 text-(--color-violet) opacity-60" />
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-accent)">
          &#9673; Tech Stack
        </p>
        <h2 className="relative mt-2 inline-block font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Tech I work with
          <ScribbleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-(--color-accent)" />
        </h2>
        <DashedArrow className="pointer-events-none mt-1 hidden h-8 w-16 text-(--color-ink)/30 sm:block" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          {SKILLS.map(({ name, icon: Icon, accent, tilt }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{ rotate: 0, scale: 1.06, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className={`group relative flex items-center gap-3 rounded-2xl border-2 border-dashed border-(--color-ink)/15 bg-(--color-canvas-raised) px-5 py-4 shadow-[4px_5px_0_0_oklch(0.10_0.03_290)] ${tilt}`}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: `var(${accent})` }}
              >
                <Icon size={18} className="text-(--color-canvas)" />
              </span>
              <span className="font-display text-sm font-extrabold">{name}</span>
              <DoodleStar className="pointer-events-none absolute -right-2 -top-2 h-4 w-4 rotate-6 text-(--color-gold) opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
