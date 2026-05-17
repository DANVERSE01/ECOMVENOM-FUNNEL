"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EditorialHeading } from "@/components/venom/EditorialHeading";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

const spring = { type: "spring" as const, stiffness: 240, damping: 26 };

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <GlassPanel className="vx-faq" style={{ overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) auto",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          cursor: "pointer",
          padding: "1rem",
          background: "none",
          border: "none",
          color: "var(--vo-text)",
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1.2,
          textAlign: "left",
        }}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={spring}
          style={{
            display: "grid",
            width: "2rem",
            height: "2rem",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "999px",
            color: "var(--vo-green)",
            fontFamily: "IBM Plex Mono, ui-monospace, monospace",
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              margin: 0,
              padding: "0 1rem 1rem",
              color: "var(--vo-muted)",
              fontSize: "0.94rem",
              lineHeight: 1.6,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassPanel>
  );
}

export function FaqSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].faq;

  return (
    <SectionWrapper id="faq" className="vx-section--compact" sceneTitle={c.eyebrow}>
      <div className="vx-shell vx-grid vx-grid--two">
        <EditorialHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
        <div className="vx-faq-list" data-vx-reveal>
          {c.items.map((item, index) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
