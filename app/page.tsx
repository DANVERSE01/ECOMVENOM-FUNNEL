import { Scene00ColdOpen } from "@/components/sections/scroll-film/Scene00ColdOpen";
import { Scene01Problem } from "@/components/sections/scroll-film/Scene01Problem";
import { Scene02ChaosToSystem } from "@/components/sections/scroll-film/Scene02ChaosToSystem";
import { Scene03Roadmap } from "@/components/sections/scroll-film/Scene03Roadmap";
import { Scene04Offer } from "@/components/sections/scroll-film/Scene04Offer";
import { Scene05Founder } from "@/components/sections/scroll-film/Scene05Founder";
import { Scene06ProofGate } from "@/components/sections/scroll-film/Scene06ProofGate";
import { Scene07Application } from "@/components/sections/scroll-film/Scene07Application";
import { Scene08FinalCTA } from "@/components/sections/scroll-film/Scene08FinalCTA";
import { SceneHairline } from "@/components/cinematic/SceneHairline";
import { SceneObserver } from "@/components/cinematic/SceneObserver";
import { EditorialMarquee } from "@/components/ui/EditorialMarquee";

export default function HomePage() {
  return (
    <div className="cinematic-page">
      <SceneObserver />
      <Scene00ColdOpen />
      {/* DANVERSE signature marquee strip — visual identity band */}
      <EditorialMarquee className="relative z-20" />
      <Scene01Problem />
      <SceneHairline className="relative z-20" />
      <Scene02ChaosToSystem />
      <SceneHairline className="relative z-20" />
      <Scene03Roadmap />
      <EditorialMarquee className="relative z-20" />
      <Scene04Offer />
      <SceneHairline className="relative z-20" />
      <Scene05Founder />
      <SceneHairline className="relative z-20" />
      <Scene06ProofGate />
      <EditorialMarquee className="relative z-20" />
      <Scene07Application />
      <SceneHairline className="relative z-20" />
      <Scene08FinalCTA />
    </div>
  );
}
