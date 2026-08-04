import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeatureCards from "@/components/FeatureCards";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="scroll-shell">
        <Hero />
        <About />
        <FeatureCards />
        <Waitlist />
        <FAQ />
      </main>
    </>
  );
}
