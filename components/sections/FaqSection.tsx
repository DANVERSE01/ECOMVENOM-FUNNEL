"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlowButton } from "@/components/venom/GlowButton";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/lang-context";

const transition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

function FaqItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-trigger-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="vx-faq-item">
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="vx-faq-item__trigger"
      >
        <span className="vx-faq-item__question">{q}</span>
        <span className={`vx-faq-item__icon${isOpen ? " vx-faq-item__icon--open" : ""}`} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="vx-faq-item__panel"
          >
            <p className="vx-faq-item__answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const { lang } = useLang();
  const { CTA_LABEL } = useContent();
  const c = recoveryCopy[lang].faq;
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <SectionWrapper id="faq" className="vx-section--compact" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-grid vx-grid--two">
        <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
        <div className="vx-faq-list" data-vx-reveal>
          {c.items.map((item, index) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
          <div className="vx-faq-cta" data-vx-reveal>
            <GlowButton href="/apply">{CTA_LABEL}</GlowButton>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
