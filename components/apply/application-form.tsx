"use client";

import { useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CtaButton } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/lang-context";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function ApplicationForm() {
  const router = useRouter();
  const { lang } = useLang();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const isFinalStep = step === 2;
  const copy = lang === "ar"
    ? {
        progressAria: "خطوة الطلب",
        progress: ["الهوية", "السوق", "الالتزام"],
        step1: "الخطوة 01 / الهوية",
        step2: "الخطوة 02 / السوق",
        step3: "الخطوة 03 / الالتزام",
        labels: {
          name: "الاسم الكامل",
          email: "البريد الإلكتروني",
          phone: "رقم واتساب مع مفتاح الدولة",
          experience: "مستوى الخبرة",
          market: "السوق المستهدف",
          budget: "ميزانية البداية الشهرية",
          challenge: "ما أكبر تحدٍ لديك في الدروبشيبينغ؟",
        },
        placeholders: {
          phone: "+20 1XX XXX XXXX",
          select: "اختر خيارًا",
        },
        options: {
          experience: ["صفر خبرة", "جرّبت من قبل", "أبيع بالفعل"],
          market: ["السوق الأمريكي", "السوق السعودي/الخليجي", "كلا السوقين"],
          budget: ["ميزانية محدودة", "ميزانية متوسطة", "جاهز للاستثمار"],
        },
        commitmentLabel: "أفهم أن هذا نظام عمل حقيقي وأنا مستعد للالتزام بالخارطة.",
        advisorNote: "بمجرد التقديم فإنك توافق على التواصل معك من قبل مستشار.",
        endpointMissing: "بوابة استقبال الطلبات غير مضبوطة بعد. اضبط NEXT_PUBLIC_FORM_ENDPOINT قبل إطلاق التقديم الحقيقي.",
        back: "رجوع",
        continue: "استمرار",
        submit: "إرسال الطلب",
        submitting: "جارٍ الإرسال...",
        validation: {
          nameRequired: "الاسم الكامل مطلوب.",
          emailRequired: "البريد الإلكتروني مطلوب.",
          emailInvalid: "أدخل بريدًا إلكترونيًا صحيحًا.",
          phoneRequired: "رقم واتساب مطلوب.",
          selectOne: "اختر خيارًا واحدًا.",
          commitment: "أكد أنك جاهز للالتزام بالخارطة.",
          completeRequired: "أكمل الحقول المطلوبة قبل المتابعة.",
          submitFailed: "فشل الإرسال. حاول مرة أخرى.",
        },
      }
    : {
        progressAria: "Application step",
        progress: ["Identity", "Market", "Commitment"],
        step1: "Step 01 / Identity",
        step2: "Step 02 / Market",
        step3: "Step 03 / Commitment",
        labels: {
          name: "Full name",
          email: "Email",
          phone: "WhatsApp number (with country code)",
          experience: "Experience level",
          market: "Target market",
          budget: "Monthly starting budget",
          challenge: "Biggest dropshipping challenge?",
        },
        placeholders: {
          phone: "+20 1XX XXX XXXX",
          select: "Select one",
        },
        options: {
          experience: ["Zero experience", "Tried before", "Already selling"],
          market: ["U.S. Market", "Saudi/Gulf Market", "Both markets"],
          budget: ["Limited budget", "Moderate budget", "Ready to invest"],
        },
        commitmentLabel: "I understand this is a business system and I am ready to follow the roadmap.",
        advisorNote: "By applying you agree to be contacted by an advisor.",
        endpointMissing: "Application intake is not configured yet. Set NEXT_PUBLIC_FORM_ENDPOINT before launching real submissions.",
        back: "Back",
        continue: "Continue",
        submit: "Submit application",
        submitting: "Submitting...",
        validation: {
          nameRequired: "Full name is required.",
          emailRequired: "Email is required.",
          emailInvalid: "Enter a valid email.",
          phoneRequired: "WhatsApp number is required.",
          selectOne: "Select one option.",
          commitment: "Confirm you are ready to follow the roadmap.",
          completeRequired: "Complete the required fields before continuing.",
          submitFailed: "Submission failed. Please try again.",
        },
      };

  function validateCurrentStep(form: HTMLFormElement) {
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const phone = String(data.get("phone") ?? "").trim();
      if (!name) nextErrors.name = copy.validation.nameRequired;
      if (!email) nextErrors.email = copy.validation.emailRequired;
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.validation.emailInvalid;
      if (!phone) nextErrors.phone = copy.validation.phoneRequired;
    }

    if (step === 1) {
      ["experience", "market", "budget"].forEach((field) => {
        if (!String(data.get(field) ?? "").trim()) nextErrors[field] = copy.validation.selectOne;
      });
    }

    if (step === 2 && data.get("commitment") !== "yes") {
      nextErrors.commitment = copy.validation.commitment;
    }

    setFieldErrors(nextErrors);
    setError(Object.keys(nextErrors).length ? copy.validation.completeRequired : null);
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
      setError(copy.endpointMissing);
      setSubmitting(false);
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
          : copy.validation.submitFailed,
      );
      setSubmitting(false);
    }
  }

  function continueToNextStep() {
    const form = formRef.current;
    if (!form || !validateCurrentStep(form)) return;
    setStep((current) => Math.min(2, current + 1));
  }

  return (
    <form
      data-integration="lead-form"
      data-endpoint={ENDPOINT ?? ""}
      ref={formRef}
      onSubmit={onSubmit}
      className="scene-panel grid gap-5 p-5 sm:p-6"
      noValidate
    >
      <div className="grid grid-cols-3 gap-2" aria-label={lang === "ar" ? `${copy.progressAria} ${step + 1} من 3` : `${copy.progressAria} ${step + 1} of 3`}>
        {copy.progress.map((label, index) => (
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
          <legend className="font-mono text-[11px] uppercase tracking-[0.12em] text-venom">
            {copy.step1}
          </legend>
          <Field label={copy.labels.name} name="name" type="text" autoComplete="name" error={fieldErrors.name} required />
          <Field label={copy.labels.email} name="email" type="email" autoComplete="email" error={fieldErrors.email} required />
          <Field
            label={copy.labels.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={copy.placeholders.phone}
            error={fieldErrors.phone}
            required
          />
      </fieldset>

      <fieldset className={step === 1 ? "grid gap-5" : "hidden"}>
          <legend className="font-mono text-[11px] uppercase tracking-[0.12em] text-venom">
            {copy.step2}
          </legend>
          <Select label={copy.labels.experience} name="experience" error={fieldErrors.experience} options={copy.options.experience} placeholder={copy.placeholders.select} />
          <Select label={copy.labels.market} name="market" error={fieldErrors.market} options={copy.options.market} placeholder={copy.placeholders.select} />
          <Select label={copy.labels.budget} name="budget" error={fieldErrors.budget} options={copy.options.budget} placeholder={copy.placeholders.select} />
      </fieldset>

      <fieldset className={step === 2 ? "grid gap-5" : "hidden"}>
          <legend className="font-mono text-[11px] uppercase tracking-[0.12em] text-venom">
            {copy.step3}
          </legend>
          <label className="form-field grid gap-2">
            <span className="form-field__label text-xs tracking-[0.12em] uppercase text-ash">
              {copy.labels.challenge}
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
              {copy.commitmentLabel}
            </label>
            {fieldErrors.commitment && <p className="mt-2 text-xs text-alert">{fieldErrors.commitment}</p>}
          </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm text-alert">
          {error}
        </p>
      )}

      {!ENDPOINT && (
        <p className="rounded-xl border border-alert/30 bg-alert/10 px-4 py-3 text-xs leading-relaxed text-ash">
          {copy.endpointMissing}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ash">
          {copy.advisorNote}
        </p>
        <div className="grid gap-3 sm:flex">
          {step > 0 && (
            <button
              type="button"
              className="tap-target border border-white/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ash transition-colors hover:border-white/25 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
            >
              {copy.back}
            </button>
          )}
          <CtaButton
            type={isFinalStep ? "submit" : "button"}
            disabled={submitting}
            onClick={isFinalStep ? undefined : continueToNextStep}
            className="cinematic-command w-full sm:w-auto"
          >
            {submitting ? copy.submitting : isFinalStep ? copy.submit : copy.continue}
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
      <span className="form-field__label text-xs tracking-[0.12em] uppercase text-ash">
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
  placeholder,
}: {
  label: string;
  name: string;
  error?: string;
  options: string[];
  placeholder: string;
}) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <label htmlFor={name} className={cn("form-field grid gap-2", error && "form-field--error")}>
      <span className="form-field__label text-xs tracking-[0.12em] uppercase text-ash">{label}</span>
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
          {placeholder}
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
