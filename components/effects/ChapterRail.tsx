"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Chapter = {
  id: string;
  title: string;
};

export function ChapterRail() {
  const pathname = usePathname();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [storyVisible, setStoryVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setChapters([]);
      setActiveId("");
      setStoryVisible(false);
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id][data-scene-title]"));
    const nextChapters = sections
      .map((section) => ({
        id: section.id,
        title: section.dataset.sceneTitle || section.id,
      }))
      .filter((chapter) => chapter.id !== "system-boot");

    setChapters(nextChapters);
    setActiveId(nextChapters[0]?.id ?? "");

    const syncStoryVisibility = () => {
      const hero = document.getElementById("system-boot");
      const film = document.getElementById("chaos-system-film");
      const filmRect = film?.getBoundingClientRect();
      const filmIsActive = Boolean(
        filmRect && filmRect.top <= window.innerHeight * 0.82 && filmRect.bottom >= window.innerHeight * 0.18,
      );

      setStoryVisible(
        !filmIsActive && (hero ? hero.getBoundingClientRect().bottom <= 120 : window.scrollY > window.innerHeight * 0.8),
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    syncStoryVisibility();
    window.addEventListener("scroll", syncStoryVisibility, { passive: true });
    window.addEventListener("resize", syncStoryVisibility, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncStoryVisibility);
      window.removeEventListener("resize", syncStoryVisibility);
    };
  }, [pathname]);

  if (pathname !== "/" || chapters.length < 2 || !storyVisible) return null;

  return (
    <nav className="chapter-rail" aria-label="Home page chapters">
      {chapters.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className="chapter-rail__item"
          data-active={chapter.id === activeId ? "true" : "false"}
          aria-current={chapter.id === activeId ? "location" : undefined}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{chapter.title}</strong>
        </a>
      ))}
    </nav>
  );
}
