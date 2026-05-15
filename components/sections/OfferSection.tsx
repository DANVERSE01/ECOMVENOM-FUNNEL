"use client";

import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { GlowButton } from "@/components/venom/GlowButton";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/lang-context";

export function OfferSection() {
  const { lang } = useLang();
  const { CTA_LABEL, graduationGift } = useContent();
  const c = recoveryCopy[lang].offer;

  return (
    <SectionWrapper id="offer" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-offer-gate">
        <GlassPanel className="vx-offer-gate__panel" variant="signal" data-vx-reveal>
          <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
          <div data-vx-reveal>
            <GlowButton href="/apply">{CTA_LABEL}</GlowButton>
          </div>
        </GlassPanel>
        <div className="vx-offer-list" data-vx-reveal>
          <GlassPanel className="vx-bento-card" variant="strong">
            <div className="vx-bento-card__top">
              <span>{lang === "ar" ? "سوق" : "MARKET"}</span>
              <span>02</span>
            </div>
            <div>
              <h3>{lang === "ar" ? "اختر السوق" : "Choose the market"}</h3>
              <p>{graduationGift.options.map((option) => option.market).join(" / ")}</p>
            </div>
          </GlassPanel>
          <div className="vx-offer-list__intro">
            <h3>{graduationGift.bonusesHeading}</h3>
            <p>{graduationGift.bonusesSub}</p>
          </div>
          {graduationGift.bonuses.map((bonus, index) => (
            <article className="vx-offer-item" key={bonus.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{bonus.title}</h3>
                <p>{bonus.body}</p>
              </div>
            </article>
          ))}
          <article className="vx-offer-item">
            <span>{String(graduationGift.bonuses.length + 1).padStart(2, "0")}</span>
            <div>
              <h3>{c.supportTitle}</h3>
              <p>{c.supportBody}</p>
            </div>
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
}
