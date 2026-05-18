import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ScrollFilmSection } from "@/components/sections/ScrollFilmSection";
import { MechanismSection } from "@/components/sections/MechanismSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

// Phase 4 — SystemStackSection deferral.
// `components/sections/SystemStackSection.tsx` exists on disk but is intentionally
// unmounted. Visual differentiation from MechanismSection has not yet been earned;
// mounting both side-by-side would dilute the operating-system narrative beat.
// Revisit when the Mechanism vs. Stack visual contrast is defined. Do not delete.

export default function HomePage() {
  return (
    <div className="venom-home">
      <HeroSection />
      <ProblemSection />
      <ScrollFilmSection />
      <MechanismSection />
      <RoadmapSection />
      <ProofSection />
      <FounderSection />
      <OfferSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
