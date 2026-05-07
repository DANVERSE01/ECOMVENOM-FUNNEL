import { confirmation } from "@/lib/content";
import { PreCallVideo } from "./pre-call-video";

export function PreCallSteps() {
  return (
    <ol className="grid gap-6">
      {confirmation.steps.map((s, i) => (
        <li
          key={i}
          className="scene-panel grid gap-4 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6"
        >
          <span className="grid h-10 w-10 place-items-center border border-steel/35 bg-steel/10 font-mono text-[10px] text-steel">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 className="font-display text-xl uppercase leading-tight tracking-tight sm:text-2xl">
              {s.title}
            </h2>
            {i === 0 ? (
              <div className="mt-5">
                <PreCallVideo />
              </div>
            ) : (
              s.body && (
                <p className="mt-3 text-ash text-base leading-relaxed max-w-2xl">
                  {s.body}
                </p>
              )
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
