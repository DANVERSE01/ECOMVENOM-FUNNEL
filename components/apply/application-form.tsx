"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CtaButton } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const isFinalStep = step === 2;

  function validateCurrentStep(form: HTMLFormElement) {
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const phone = String(data.get("phone") ?? "").trim();
      if (!name) nextErrors.name = "Full name is required.";
      if (!email) nextErrors.email = "Email is required.";
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email.";
      if (!phone) nextErrors.phone = "WhatsApp number is required.";
    }

    if (step === 1) {
      ["experience", "market", "budget"].forEach((field) => {
        if (!String(data.get(field) ?? "").trim()) nextErrors[field] = "Select one option.";
      });
    }

    if (step === 2 && data.get("commitment") !== "yes") {
      nextErrors.commitment = "Confirm you are ready to follow the roadmap.";
    }

    setFieldErrors(nextErrors);
    setError(Object.keys(nextErrors).length ? "Complete the required fields before continuing." : null);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validateCurrentStep(form)) return;

    if (!isFinalStep) {
      setStep((current) => Math.min(2, current + 1));
      return;
    }

    setError(null);
    setSubmitting(true);

    const data = Object.fromEntries(new FormData(form).entries());

    if (!ENDPOINT) {
      // No backend configured yet — treat as a soft success and forward.
      setSubmitting(false);
      router.push("/schedule");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      router.push("/schedule");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form
      data-integration="lead-form"
      data-endpoint={ENDPOINT ?? ""}
      onSubmit={onSubmit}
      className="scene-panel grid gap-5 p-5 sm:p-6"
      noValidate
    >
      <div className="grid grid-cols-3 gap-2" aria-label={`Application step ${step + 1} of 3`}>
        {["Identity", "Market", "Commitment"].map((label, index) => (
          <div key={label} className="grid gap-2" aria-current={step === index ? "step" : undefined}>
            <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-ash/70">
              {label}
            </span>
            <div className="h-1 bg-white/10">
              <div
                className="h-full bg-venom transition-transform"
                style={{ transform: `scaleX(${step >= index ? 1 : 0})`, transformOrigin: "left" }}
              />
            </div>
          </div>
        ))}
      </div>

      <fieldset className={step === 0 ? "grid gap-5" : "hidden"}>
          <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-venom">
            Step 01 / Identity
          </legend>
          <Field label="Full name" name="name" type="text" autoComplete="name" error={fieldErrors.name} required />
          <Field label="Email" name="email" type="email" autoComplete="email" error={fieldErrors.email} required />
          <Field
            label="WhatsApp number (with country code)"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+20 1XX XXX XXXX"
            error={fieldErrors.phone}
            required
          />
      </fieldset>

      <fieldset className={step === 1 ? "grid gap-5" : "hidden"}>
          <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-venom">
            Step 02 / Market
          </legend>
          <Select label="Experience level" name="experience" error={fieldErrors.experience} options={["Zero experience", "Tried before", "Already selling"]} />
          <Select label="Target market" name="market" error={fieldErrors.market} options={["U.S. Market", "Saudi/Gulf Market", "Both markets"]} />
          <Select label="Monthly starting budget" name="budget" error={fieldErrors.budget} options={["Limited budget", "Moderate budget", "Ready to invest"]} />
      </fieldset>

      <fieldset className={step === 2 ? "grid gap-5" : "hidden"}>
          <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-venom">
            Step 03 / Commitment
          </legend>
          <label className="form-field grid gap-2">
            <span className="form-field__label text-xs tracking-[0.18em] uppercase text-ash">
              Biggest dropshipping challenge?
            </span>
            <textarea
              name="message"
              rows={4}
              className="form-control border border-white/10 bg-ink-3/60 px-4 py-3 text-sm text-bone transition-colors focus:border-venom focus:outline-none focus:ring-2 focus:ring-venom/15"
            />
          </label>
          <div>
            <label className="flex gap-3 text-sm leading-relaxed text-ash">
              <input name="commitment" type="checkbox" value="yes" className="mt-1 h-5 w-5 accent-venom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom" required />
              I understand this is a business system and I am ready to follow the roadmap.
            </label>
            {fieldErrors.commitment && <p className="mt-2 text-xs text-alert">{fieldErrors.commitment}</p>}
          </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm text-alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ash">
          By applying you agree to be contacted by an advisor.
        </p>
        <div className="grid gap-3 sm:flex">
          {step > 0 && (
            <button
              type="button"
              className="tap-target border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ash transition-colors hover:border-white/25 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
            >
              Back
            </button>
          )}
          <CtaButton type="submit" disabled={submitting} className="cinematic-command w-full sm:w-auto">
            {submitting ? "Submitting..." : isFinalStep ? "Submit application" : "Continue"}
          </CtaButton>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  ...rest
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = rest.id ?? rest.name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;

  return (
    <label htmlFor={fieldId} className={cn("form-field grid gap-2", error && "form-field--error")}>
      <span className="form-field__label text-xs tracking-[0.18em] uppercase text-ash">
        {label}
      </span>
      <input
        {...rest}
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          "form-control tap-target border bg-ink-3/60 px-4 py-3 text-sm text-bone transition-colors focus:border-venom focus:outline-none focus:ring-2 focus:ring-venom/15",
          error ? "border-alert" : "border-white/10",
        )}
      />
      {error && <p id={errorId} className="text-xs text-alert">{error}</p>}
    </label>
  );
}

function Select({
  label,
  name,
  error,
  options,
}: {
  label: string;
  name: string;
  error?: string;
  options: string[];
}) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <label htmlFor={name} className={cn("form-field grid gap-2", error && "form-field--error")}>
      <span className="form-field__label text-xs tracking-[0.18em] uppercase text-ash">{label}</span>
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          "form-control tap-target border bg-ink-3/60 px-4 py-3 text-sm text-bone transition-colors focus:border-venom focus:outline-none focus:ring-2 focus:ring-venom/15",
          error ? "border-alert" : "border-white/10",
        )}
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p id={errorId} className="text-xs text-alert">{error}</p>}
    </label>
  );
}
