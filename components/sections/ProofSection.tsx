"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CountUpNumber } from "@/components/ui/count-up";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { StatusPill } from "@/components/venom/StatusPill";
import { proofAssets, recoveryCopy, type ProofAsset } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";
import type { Lang } from "@/lib/translations";
import { useTilt } from "@/lib/tilt";

const formatNumber = (value: number) => value.toLocaleString("en-US");

function ProofNote({ asset, lang }: { asset: ProofAsset; lang: Lang }) {
  if (asset.src === "/proof/proof-shopify-dashboard.png") {
    return (
      <p>
        {lang === "ar" ? (
          <>
            $<CountUpNumber value={5029} format={formatNumber} /> خلال شهر واحد، <CountUpNumber value={81} /> أوردر، تحويل 2.88%. لقطة مباشرة من المنصة بدون إضافات.
          </>
        ) : (
          <>
            $<CountUpNumber value={5029} format={formatNumber} /> in a single month, <CountUpNumber value={81} /> orders, 2.88% conversion. Direct platform capture, no edits.
          </>
        )}
      </p>
    );
  }

  if (asset.src === "/proof/proof-easyorders-flood.png") {
    return (
      <p>
        {lang === "ar" ? (
          <>
            <CountUpNumber value={9} /> أوردرات في أقل من دقيقتين، كل واحد 220، إشعارات اتسجلت لايف وقت الإطلاق.
          </>
        ) : (
          <>
            <CountUpNumber value={9} /> orders in under 2 minutes, 220 each. Notification stack captured during launch.
          </>
        )}
      </p>
    );
  }

  if (asset.src === "/proof/proof-whatsapp-stats.png") {
    return (
      <p>
        {lang === "ar" ? (
          <>
            <CountUpNumber value={9} /> أوردرات لحد الفجر، متوسط الطلب 352 ريال، تحويل 1.61% — تحديث من تشغيل حقيقي.
          </>
        ) : (
          <>
            <CountUpNumber value={9} /> orders by Fajr, SAR 352 AOV, 1.61% conversion — update from a working operator.
          </>
        )}
      </p>
    );
  }

  return <p>{asset.note}</p>;
}

function ProofCardTilt({
  active,
  asset,
  index,
  lang,
  onInspect,
}: {
  active: boolean;
  asset: ProofAsset;
  index: number;
  lang: Lang;
  onInspect: (index: number) => void;
}) {
  const tiltRef = useTilt<HTMLButtonElement>(4);

  return (
    <button
      ref={tiltRef}
      type="button"
      className="v2-proof-card"
      aria-pressed={active}
      onClick={() => onInspect(index)}
    >
      <div className="v2-proof-card__media">
        <Image src={asset.src} alt={asset.alt} fill sizes="(min-width: 1040px) 26vw, 92vw" />
      </div>
      <div className="v2-proof-card__body">
        <small>{asset.market}</small>
        <h3>{asset.label}</h3>
        <ProofNote asset={asset} lang={lang} />
      </div>
    </button>
  );
}

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
            <ProofCardTilt
              key={asset.src}
              active={index === activeIndex}
              asset={asset}
              index={index}
              lang={lang}
              onInspect={(nextIndex) => {
                setActiveIndex(nextIndex);
                setInspectIndex(nextIndex);
              }}
            />
          ))}
        </div>
        <GlassPanel className="vx-bento-card" variant="signal" data-vx-reveal>
          <div className="vx-bento-card__top">
            <StatusPill tone="signal">{lang === "ar" ? "ملاحظة شفافية" : "Transparency note"}</StatusPill>
          </div>
          <div>
            <h3>{c.transparency}</h3>
            <ProofNote asset={active} lang={lang} />
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
              <ProofNote asset={inspected} lang={lang} />
            </div>
          </div>
          </>
        ) : null}
      </dialog>
    </SectionWrapper>
  );
}
