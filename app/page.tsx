import { HeroSection } from "@/components/sections/HeroSection";
import { ScrollFilmSection } from "@/components/sections/ScrollFilmSection";
import { MechanismSection } from "@/components/sections/MechanismSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="venom-home">
      <HeroSection />
      <ScrollFilmSection />
      <MechanismSection />
      <RoadmapSection />
      <FounderSection />
      <ProofSection />
      <OfferSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
