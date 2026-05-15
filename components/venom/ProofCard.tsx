import Image from "next/image";
import { GlassPanel } from "./GlassPanel";

type ProofCardProps = {
  alt: string;
  label: string;
  note: string;
  src: string;
};

export function ProofCard({ alt, label, note, src }: ProofCardProps) {
  return (
    <GlassPanel className="vx-proof-card">
      <div className="vx-proof-card__media">
        <Image src={src} alt={alt} fill sizes="(min-width: 960px) 30vw, (min-width: 640px) 45vw, 92vw" />
      </div>
      <div className="vx-proof-card__body">
        <h3>{label}</h3>
        <p>{note}</p>
      </div>
    </GlassPanel>
  );
}
