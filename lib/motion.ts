import { gsap, SplitText, reducedMotion } from "@/lib/gsap";

/**
 * splitText — Lightweight SplitText replacement (no GSAP Club dependency).
 *
 * Splits a DOM element's text content into individually animatable
 * <span> wrappers for lines, words, or characters.
 *
 * Returns { elements, revert } where `elements` is the array of created spans
 * and `revert()` restores the original innerHTML.
 */

export type SplitType = "lines" | "words" | "chars";

interface SplitResult {
  elements: HTMLElement[];
  revert: () => void;
}

export function revealHeadline(target: HTMLElement | null) {
  if (!target || reducedMotion()) return;

  const split = new SplitText(target, { type: "chars,words", mask: "chars" });
  gsap.from(split.chars, {
    yPercent: 110,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.018,
  });

  return split;
}

function getTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.textContent && node.textContent.length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  let next = walker.nextNode();
  while (next) {
    nodes.push(next as Text);
    next = walker.nextNode();
  }

  return nodes;
}

function wrapTextParts(
  root: HTMLElement,
  type: "words" | "chars",
  createSpan: (text: string) => HTMLElement,
): HTMLElement[] {
  const created: HTMLElement[] = [];
  const doc = root.ownerDocument;

  getTextNodes(root).forEach((node) => {
    const value = node.nodeValue ?? "";
    if (!value) return;

    const parts = type === "words" ? value.split(/(\s+)/) : Array.from(value);
    const fragment = doc.createDocumentFragment();
    let changed = false;

    parts.forEach((part) => {
      if (!part) return;

      if (/^\s+$/.test(part)) {
        fragment.appendChild(doc.createTextNode(part));
        return;
      }

      changed = true;
      const span = createSpan(part);
      span.textContent = part;
      created.push(span);
      fragment.appendChild(span);
    });

    if (changed) {
      node.parentNode?.replaceChild(fragment, node);
    }
  });

  return created;
}

function unwrapTemporaryWordSpans(fragment: DocumentFragment) {
  fragment.querySelectorAll<HTMLElement>("[data-split-word]").forEach((span) => {
    span.replaceWith(...Array.from(span.childNodes));
  });
}

/**
 * Split an element's text content into animatable spans.
 *
 * @param el   - The target DOM element.
 * @param type - What to split into: "lines", "words", or "chars".
 * @param opts - Options:
 *   - className: CSS class for each created span (default: "split-line" for lines, "split-word" for words, "split-char" for chars).
 *   - mask: If true (only for "lines"), wraps each line in an overflow:hidden container for mask-reveal effects.
 */
export function splitText(
  el: HTMLElement,
  type: SplitType,
  opts: { className?: string; mask?: boolean } = {},
): SplitResult {
  const original = el.innerHTML;

  const revert = () => {
    el.innerHTML = original;
  };

  if (type === "chars") {
    const cls = opts.className ?? "split-char";
    const elements = wrapTextParts(el, "chars", () => {
      const span = el.ownerDocument.createElement("span");
      span.className = cls;
      span.style.display = "inline-block";
      return span;
    });
    return { elements, revert };
  }

  if (type === "words") {
    const cls = opts.className ?? "split-word";
    const elements = wrapTextParts(el, "words", () => {
      const span = el.ownerDocument.createElement("span");
      span.className = cls;
      span.style.display = "inline-block";
      return span;
    });
    return { elements, revert };
  }

  // type === "lines"
  const cls = opts.className ?? "split-line";

  const wordSpans = wrapTextParts(el, "words", () => {
    const span = el.ownerDocument.createElement("span");
    span.dataset.splitWord = "";
    span.style.display = "inline-block";
    return span;
  });
  if (wordSpans.length === 0) return { elements: [], revert };

  // Group words by their top offset to detect lines
  const lines: HTMLElement[][] = [];
  let currentLine: HTMLElement[] = [];
  let currentTop = wordSpans[0].getBoundingClientRect().top;

  wordSpans.forEach((ws) => {
    const top = ws.getBoundingClientRect().top;
    if (Math.abs(top - currentTop) > 4) {
      lines.push(currentLine);
      currentLine = [ws];
      currentTop = top;
    } else {
      currentLine.push(ws);
    }
  });
  if (currentLine.length) lines.push(currentLine);

  const doc = el.ownerDocument;
  const rebuilt = doc.createDocumentFragment();
  const elements: HTMLElement[] = [];

  lines.forEach((lineWords) => {
    const range = doc.createRange();
    range.setStartBefore(lineWords[0]);
    range.setEndAfter(lineWords[lineWords.length - 1]);

    const content = range.extractContents();
    unwrapTemporaryWordSpans(content);

    const line = doc.createElement("span");
    line.className = cls;
    line.style.display = "block";
    line.style.willChange = "transform";
    line.appendChild(content);

    if (opts.mask) {
      const mask = doc.createElement("span");
      mask.style.display = "block";
      mask.style.overflow = "hidden";
      mask.appendChild(line);
      rebuilt.appendChild(mask);
    } else {
      rebuilt.appendChild(line);
    }

    elements.push(line);
  });

  el.replaceChildren(rebuilt);
  return { elements, revert };
}

/**
 * scrambleText — Lightweight ScrambleText replacement (no GSAP Club dependency).
 *
 * Animates text by scrambling characters and progressively revealing the final text.
 * Uses gsap core onUpdate for frame-synced updates.
 */
const LATIN_SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const ARABIC_SCRAMBLE_CHARS = "ابتثجحخدذرزسشصضطظعغفقكلمنهويءةى0123456789";

function inferScrambleChars(finalText: string, chars?: string) {
  if (chars) return Array.from(chars);

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u.test(finalText);
  const fallback = isArabic ? ARABIC_SCRAMBLE_CHARS : LATIN_SCRAMBLE_CHARS;
  const derived = Array.from(new Set(
    Array.from(finalText.normalize("NFKC")).filter((char) => !/[\s\p{P}\p{S}]/u.test(char)),
  ));

  return [...derived, ...Array.from(fallback).filter((char) => !derived.includes(char))];
}

export function scrambleText(
  el: HTMLElement,
  finalText: string,
  opts: {
    duration?: number;
    chars?: string;
    onComplete?: () => void;
  } = {},
) {
  const {
    duration = 0.6,
    chars,
    onComplete,
  } = opts;

  const finalSymbols = Array.from(finalText);
  const scrambleSymbols = inferScrambleChars(finalText, chars);
  const len = finalSymbols.length;
  let startTime: number | null = null;
  const durationMs = duration * 1000;

  function update(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / durationMs, 1);

    // Number of characters revealed so far
    const revealed = Math.floor(progress * len);
    let result = "";

    for (let i = 0; i < len; i++) {
      const symbol = finalSymbols[i];
      if (i < revealed || /[\s\p{P}\p{S}]/u.test(symbol)) {
        result += symbol;
      } else {
        result += scrambleSymbols[Math.floor(Math.random() * scrambleSymbols.length)] ?? symbol;
      }
    }

    el.textContent = result;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = finalSymbols.join("");
      onComplete?.();
    }
  }

  requestAnimationFrame(update);
}

/**
 * animateStrokeDraw — DrawSVG replacement using stroke-dasharray/dashoffset.
 *
 * Animates an SVG path/line from "invisible" to fully drawn using
 * native SVG stroke properties, animated via gsap core.
 */
export function getStrokeLength(el: SVGGeometryElement): number {
  return el.getTotalLength();
}

export function setupStrokeDraw(el: SVGGeometryElement) {
  const length = el.getTotalLength();
  el.style.strokeDasharray = `${length}`;
  el.style.strokeDashoffset = `${length}`;
}
