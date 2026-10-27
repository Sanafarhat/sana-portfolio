import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { ScribbleUnderline, TapeStrip, DoodleStar, SparkleBurst, HalftoneDots, ComicBurst } from "../components/Doodles";

const PROJECTS = [
  {
    title: "HackSphere",
    tag: "Full Stack · AI",
    img: "/img/project-1.png",
    accent: "--color-violet",
    rotate: "-rotate-2",
    stack: "React · JavaScript · Node.js · Express · MongoDB",
    link: { label: "Live Demo", href: "https://hack-sphere-project-chi.vercel.app/" },
    description:
      "AI-powered hackathon platform for idea submission, team formation, progress tracking and project showcasing. Includes AI-assisted idea validation and team recommendations, with the frontend on Vercel and backend on Render over MongoDB.",
  },
  {
    title: "SkyGuard AI",
    tag: "Machine Learning",
    img: "/img/project-2.jpg",
    accent: "--color-coral",
    rotate: "rotate-1",
    stack: "Python · XGBoost · SHAP · FastAPI · PostgreSQL",
    link: { label: "Live Demo", href: "https://sky-guard-ai-sih.vercel.app/" },
    description:
      "ML pipeline that separates genuine meteorological events from sensor and data anomalies, using temporal, spatial, persistence and physics-aware features in an XGBoost fusion model, with SHAP explanations served via FastAPI/PostgreSQL.",
  },
  {
    title: "ExpertBridge",
    tag: "Full Stack",
    img: "/img/project-3.jpg",
    accent: "--color-cyan",
    rotate: "-rotate-1",
    stack: "Next.js · TypeScript · Prisma · SQLite · NextAuth.js",
    link: { label: "GitHub", href: "https://github.com/Sanafarhat/ExpertBridge" },
    description:
      "Expert discovery platform with institution-facing workflows for onboarding, document submission and verification tracking, plus a requirement-based matching engine using domain relevance, suitability, availability and experience.",
  },
  {
    title: "Technical Hub Internship",
    tag: "Experience",
    img: "/img/project-4.png",
    accent: "--color-gold",
    rotate: "rotate-2",
    stack: "React · REST APIs · Git/GitHub",
    link: { label: "View Certificate", href: "/img/internship-certificate.jpg" },
    description:
      "Full Stack Development Intern (May–June 2025). Built reusable React components and responsive interfaces, integrated REST APIs, investigated bugs and collaborated with senior engineers.",
  },
];

type Project = (typeof PROJECTS)[number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { y: 40 },
  show: { y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({
  p,
  i,
  onOpen,
}: {
  p: Project;
  i: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(p)}
      data-cursor="grow"
      variants={item}
      whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`group relative block w-full text-left rounded-3xl border-2 border-dashed border-(--color-ink)/15 bg-(--color-canvas-raised) p-3 shadow-[6px_8px_0_0_oklch(0.10_0.03_290)] ${p.rotate}`}
    >
      <TapeStrip
        color={`var(${p.accent})`}
        className={`absolute -top-3 z-10 ${i % 2 === 0 ? "left-6 -rotate-[8deg]" : "right-6 rotate-[6deg]"}`}
      />
      {i === 0 && (
        <ComicBurst
          color="var(--color-accent)"
          className="absolute -right-4 -top-4 z-10 h-12 w-12 rotate-6 text-[10px] font-display font-extrabold text-(--color-canvas)"
        >
          NEW
        </ComicBurst>
      )}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={p.img}
          alt={`${p.title} project thumbnail`}
          className="aspect-[4/3] w-full bg-white object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="px-1 pb-1 pt-4">
        <span
          className="rounded-full px-3 py-1 text-xs font-bold text-(--color-canvas)"
          style={{ backgroundColor: `var(${p.accent})` }}
        >
          {p.tag}
        </span>
        <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight">{p.title}</h3>
      </div>
      <DoodleStar className="pointer-events-none absolute -right-2 -top-2 h-5 w-5 text-(--color-gold) opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!selected && !showAll) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selected) setSelected(null);
        else setShowAll(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, showAll]);

  useEffect(() => {
    const handleOpenAll = () => setShowAll(true);
    window.addEventListener("open-all-projects", handleOpenAll);
    return () => window.removeEventListener("open-all-projects", handleOpenAll);
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute right-4 top-2 h-24 w-40 text-(--color-coral) opacity-25 md:right-14" />
      <SparkleBurst className="pointer-events-none absolute left-[3%] top-24 h-7 w-7 text-(--color-cyan) opacity-70" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-accent)">
              &#9673; Featured Work
            </p>
            <h2 className="relative mt-2 inline-block font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Things I&rsquo;ve built
              <ScribbleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-(--color-coral)" />
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowAll(true)}
            data-cursor="grow"
            className="group relative flex items-center gap-1 font-display text-sm font-extrabold text-(--color-ink)/80 transition-colors hover:text-(--color-accent)"
          >
            View All Projects <ArrowUpRight size={16} />
            <ScribbleUnderline className="absolute -bottom-2 left-0 h-2 w-[85%] text-(--color-accent) opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} onOpen={setSelected} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showAll && !selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl border-2 border-dashed border-(--color-ink)/20 bg-(--color-canvas-raised) p-6 shadow-[8px_10px_0_0_oklch(0.10_0.03_290)] sm:p-8"
            >
              <TapeStrip color="var(--color-accent)" className="absolute -top-3 left-8 z-10" />
              <SparkleBurst className="pointer-events-none absolute -right-3 -top-3 h-9 w-9 text-(--color-accent)" />
              <button
                data-cursor="grow"
                onClick={() => setShowAll(false)}
                aria-label="Close all projects"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-(--color-canvas) text-(--color-ink) transition-transform hover:scale-110"
              >
                <X size={16} />
              </button>

              <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-accent)">
                &#9673; All Projects
              </p>
              <h3 className="relative mt-2 inline-block font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                Everything I&rsquo;ve built so far
                <ScribbleUnderline className="absolute -bottom-2 left-0 h-2 w-full text-(--color-accent)" />
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {PROJECTS.map((p, i) => (
                  <ProjectCard key={p.title} p={p} i={i} onOpen={setSelected} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border-2 border-dashed border-(--color-ink)/20 bg-(--color-canvas-raised) p-6 shadow-[8px_10px_0_0_oklch(0.10_0.03_290)] sm:p-8"
            >
              <TapeStrip color={`var(${selected.accent})`} className="absolute -top-3 left-8 z-10" />
              <SparkleBurst className="pointer-events-none absolute -right-3 -top-3 h-9 w-9 text-(--color-accent)" />
              <button
                data-cursor="grow"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-(--color-canvas) text-(--color-ink) transition-transform hover:scale-110"
              >
                <X size={16} />
              </button>

              <div className="overflow-hidden rounded-2xl">
                <img
                  src={selected.img}
                  alt={`${selected.title} project artwork`}
                  className="aspect-[4/3] w-full bg-white object-contain"
                />
              </div>

              <span
                className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-(--color-canvas)"
                style={{ backgroundColor: `var(${selected.accent})` }}
              >
                {selected.tag}
              </span>
              <h3 className="relative mt-3 inline-block font-display text-2xl font-extrabold tracking-tight">
                {selected.title}
                <ScribbleUnderline className="absolute -bottom-2 left-0 h-2 w-full text-(--color-accent)" />
              </h3>
              <p className="mt-3 text-xs font-bold text-(--color-ink)/60">{selected.stack}</p>
              <p className="mt-4 text-(--color-ink)/80">{selected.description}</p>
              {selected.link && (
                <a
                  href={selected.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="grow"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-6 py-3 font-display text-sm font-extrabold text-(--color-canvas) shadow-[4px_6px_0_0_oklch(0.16_0.04_290)]"
                >
                  {selected.link.label} <ArrowUpRight size={16} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
