"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { StatusPill } from "@/components/venom/StatusPill";
import { proofAssets, recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

export function ProofSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].proof;
  const assets = proofAssets[lang];
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectIndex, setInspectIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const active = assets[activeIndex];
  const inspected = inspectIndex === null ? null : assets[inspectIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (inspected && !dialog.open) {
      dialog.showModal();
    }

    if (!inspected && dialog.open) {
      dialog.close();
    }
  }, [inspected]);

  return (
    <SectionWrapper id="proof" className="vx-section--compact" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-grid">
        <div className="v2-section-copy" data-vx-reveal>
          <span className="v2-label">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p>{c.body}</p>
        </div>
        <div className="v2-proof-rail" data-vx-reveal>
          {assets.map((asset, index) => (
            <button
              type="button"
              className="v2-proof-card"
              key={asset.src}
              aria-pressed={index === activeIndex}
              onClick={() => {
                setActiveIndex(index);
                setInspectIndex(index);
              }}
            >
              <div className="v2-proof-card__media">
                <Image src={asset.src} alt={asset.alt} fill sizes="(min-width: 1040px) 26vw, 92vw" />
              </div>
              <div className="v2-proof-card__body">
                <small>{asset.market}</small>
                <h3>{asset.label}</h3>
                <p>{asset.note}</p>
              </div>
            </button>
          ))}
        </div>
        <GlassPanel className="vx-bento-card" variant="signal" data-vx-reveal>
          <div className="vx-bento-card__top">
            <StatusPill tone="signal">{lang === "ar" ? "ملاحظة شفافية" : "Transparency note"}</StatusPill>
          </div>
          <div>
            <h3>{c.transparency}</h3>
            <p>{active.note}</p>
          </div>
        </GlassPanel>
      </div>
      <dialog
        ref={dialogRef}
        className="proof-inspector"
        aria-label={inspected?.label}
        onClose={() => setInspectIndex(null)}
      >
        {inspected ? (
          <>
          <button type="button" className="proof-inspector__backdrop" aria-label={lang === "ar" ? "إغلاق" : "Close"} onClick={() => dialogRef.current?.close()} />
          <div className="proof-inspector__panel">
            <button type="button" className="proof-inspector__close" onClick={() => dialogRef.current?.close()}>
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
            <div className="proof-inspector__media">
              <Image src={inspected.src} alt={inspected.alt} fill sizes="min(92vw, 920px)" />
            </div>
            <div className="proof-inspector__copy">
              <small>{inspected.market}</small>
              <h3>{inspected.label}</h3>
              <p>{inspected.note}</p>
            </div>
          </div>
          </>
        ) : null}
      </dialog>
    </SectionWrapper>
  );
}
