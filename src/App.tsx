import { useEffect } from "react";
import { Cursor } from "./components/Cursor";
import { CornerMarks } from "./components/CornerMarks";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Showreel } from "./sections/Showreel";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { About } from "./sections/About";
import { Footer } from "./sections/Footer";
import { initLenis } from "./lib/lenis";
import { WavyDivider } from "./components/Doodles";

function Divider({ color }: { color: string }) {
  return (
    <div className="px-6 md:px-12">
      <WavyDivider className="mx-auto h-6 w-full max-w-6xl" color={color} />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Cursor />
      <CornerMarks />
      <Nav />
      <main>
        <Hero />
        <Showreel />
        <Divider color="var(--color-violet)" />
        <Projects />
        <Divider color="var(--color-coral)" />
        <Skills />
        <Divider color="var(--color-cyan)" />
        <About />
      </main>
      <Footer />
    </>
  );
}
