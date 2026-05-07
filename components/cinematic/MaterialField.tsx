import { cn } from "@/lib/cn";

export function MaterialField({
  scene,
  className,
}: {
  scene: string;
  className?: string;
}) {
  return (
    <div className={cn("material-field", className)} data-scene={scene} aria-hidden>
      <span className="material-field__plate material-field__plate--back" />
      <span className="material-field__plate material-field__plate--front" />
      <span className="material-field__tunnel" />
      <span className="material-field__sweep" />
      <span className="material-field__ticks material-field__ticks--left" />
      <span className="material-field__ticks material-field__ticks--right" />
    </div>
  );
}
