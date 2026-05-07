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
  const text = el.textContent ?? "";

  const revert = () => {
    el.innerHTML = original;
  };

  if (type === "chars") {
    const cls = opts.className ?? "split-char";
    el.innerHTML = text
      .split("")
      .map((c) => (c === " " ? " " : `<span class="${cls}" style="display:inline-block">${c}</span>`))
      .join("");
    const elements = Array.from(el.querySelectorAll<HTMLElement>(`.${cls}`));
    return { elements, revert };
  }

  if (type === "words") {
    const cls = opts.className ?? "split-word";
    el.innerHTML = text
      .split(/(\s+)/)
      .map((w) =>
        /^\s+$/.test(w) ? w : `<span class="${cls}" style="display:inline-block">${w}</span>`,
      )
      .join("");
    const elements = Array.from(el.querySelectorAll<HTMLElement>(`.${cls}`));
    return { elements, revert };
  }

  // type === "lines"
  const cls = opts.className ?? "split-line";

  // First, split into words to measure which words end up on which line
  const words = text.split(/(\s+)/);
  el.innerHTML = words
    .map((w, i) =>
      /^\s+$/.test(w) ? w : `<span data-sw="${i}" style="display:inline-block">${w}</span>`,
    )
    .join("");

  const wordSpans = Array.from(el.querySelectorAll<HTMLElement>("[data-sw]"));
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

  // Rebuild el with line spans
  if (opts.mask) {
    el.innerHTML = lines
      .map((lineWords) => {
        const lineText = lineWords.map((w) => w.textContent).join(" ");
        return `<span style="display:block;overflow:hidden"><span class="${cls}" style="display:block;will-change:transform">${lineText}</span></span>`;
      })
      .join("");
  } else {
    el.innerHTML = lines
      .map((lineWords) => {
        const lineText = lineWords.map((w) => w.textContent).join(" ");
        return `<span class="${cls}" style="display:block;will-change:transform">${lineText}</span>`;
      })
      .join("");
  }

  const elements = Array.from(el.querySelectorAll<HTMLElement>(`.${cls}`));
  return { elements, revert };
}

/**
 * scrambleText — Lightweight ScrambleText replacement (no GSAP Club dependency).
 *
 * Animates text by scrambling characters and progressively revealing the final text.
 * Uses gsap core onUpdate for frame-synced updates.
 */
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
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    onComplete,
  } = opts;

  const len = finalText.length;
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
      if (i < revealed) {
        result += finalText[i];
      } else if (finalText[i] === " ") {
        result += " ";
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    el.textContent = result;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = finalText;
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
