import { cn } from "@/lib/cn";

export function ScrollFilmScene({
  id,
  scene,
  title,
  className,
  children,
}: {
  id?: string;
  scene: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-scene-title={title}
      className={cn("relative isolate overflow-hidden bg-black text-bone", className)}
    >
      {children}
    </section>
  );
}
