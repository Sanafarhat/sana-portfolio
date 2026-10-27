import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";
import { DoodleStar, HalftoneDots, TapeStrip, WavyDivider, DashedArrow, SparkleBurst } from "../components/Doodles";

export function Showreel() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const handlePlayRequest = () => {
      const video = videoRef.current;
      if (video && video.paused) {
        video.play();
        setPlaying(true);
      }
    };
    window.addEventListener("play-showreel", handlePlayRequest);
    return () => window.removeEventListener("play-showreel", handlePlayRequest);
  }, []);

  return (
    <section id="showreel" className="relative overflow-hidden px-6 py-20 md:px-12">
      <HalftoneDots className="pointer-events-none absolute right-2 top-6 h-24 w-40 text-(--color-violet) opacity-30 md:right-10" />
      <DoodleStar className="pointer-events-none absolute left-[4%] top-10 h-5 w-5 text-(--color-gold) opacity-70" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-accent)">
              &#9673; Intro Video
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              A quick glimpse of who I am<br className="hidden md:block" /> and what I love building.
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.97 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 rounded-3xl border-2 border-(--color-ink)/10 bg-(--color-canvas-raised) p-3 shadow-[8px_10px_0_0_oklch(0.10_0.03_290)] -rotate-1"
        >
          <TapeStrip color="var(--color-gold)" className="absolute -top-3 left-8 z-10" />
          <TapeStrip color="var(--color-cyan)" className="absolute -top-3 right-10 z-10 rotate-[8deg]" />
          <SparkleBurst className="pointer-events-none absolute -right-3 -bottom-3 z-10 h-8 w-8 text-(--color-gold)" />
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            <video
              ref={videoRef}
              src="/video/intro.mp4"
              className="h-full w-full object-cover"
              playsInline
              loop
              preload="metadata"
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity ${
                playing ? "opacity-0" : "opacity-100"
              }`}
            >
              <button
                data-cursor="grow"
                onClick={togglePlay}
                aria-label="Play intro video"
                className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-(--color-accent) shadow-[0_0_0_8px_oklch(0.97_0.01_290_/_0.08)] transition-transform hover:scale-110"
              >
                <Play size={28} className="ml-1 fill-(--color-canvas) text-(--color-canvas)" />
              </button>
            </div>
            {playing && (
              <button
                data-cursor="grow"
                onClick={togglePlay}
                aria-label="Pause intro video"
                className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-(--color-canvas)/70 text-(--color-ink) backdrop-blur transition-transform hover:scale-110"
              >
                <Pause size={16} className="fill-current" />
              </button>
            )}
            <DashedArrow className="pointer-events-none absolute -left-2 bottom-4 hidden h-10 w-16 text-(--color-ink)/50 sm:block" />
          </div>
        </motion.div>
        <WavyDivider className="mt-16 h-8 w-full text-(--color-ink)/15" />
      </div>
    </section>
  );
}
