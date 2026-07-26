import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Enquire — Elden Interior Studio, Dubai" },
      {
        name: "description",
        content:
          "Begin a project enquiry with Elden. Al Quoz Industrial Area 2, Dubai. info@eldenuae.com · +971 4 227 6206.",
      },
      { property: "og:title", content: "Enquire — Elden" },
      {
        property: "og:description",
        content: "Begin a project enquiry with Elden's Dubai studio.",
      },
    ],
  }),
  component: ContactPage,
});

const sectors = [
  "Hospitality",
  "Restaurants",
  "Retail",
  "Commercial",
  "Leisure",
  "Cultural",
  "Residential",
  "Other",
];
const scopes = ["Fit-out", "Joinery", "MEP", "Full turnkey", "Maintenance"];
const budgets = ["Under AED 500K", "AED 500K — 1.5M", "AED 1.5M — 5M", "AED 5M+"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <section className="relative border-b border-border/60 pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Enquire</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[0.98] text-balance md:text-[6.5vw] lg:text-[6rem]">
              A conversation is the first stage of a build.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              Every Elden project begins with a scoped consultation — usually
              over coffee, at our Al Quoz studio or on your site. Tell us
              about the space you have in mind and a project director will
              respond within one working day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/60 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-20 px-6 md:grid-cols-[1fr_1.6fr] md:px-10">
          <Reveal>
            <div className="space-y-14">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Studio</p>
                <p className="mt-5 font-display text-2xl leading-snug">
                  Elden Interior Design LLC<br />
                  Al Quoz Industrial Area 2<br />
                  Opposite Planet Eco<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Direct</p>
                <p className="mt-5 space-y-1 font-display text-2xl leading-snug">
                  <a className="block hover:text-accent" href="tel:+97142276206">
                    +971 4 227 6206
                  </a>
                  <a className="block hover:text-accent" href="mailto:info@eldenuae.com">
                    info@eldenuae.com
                  </a>
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Hours</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Sunday — Thursday · 09:00 — 18:00 GST<br />
                  Site visits by appointment.
                </p>
              </div>
              <a
                href="https://maps.google.com/maps?cid=18178852521169327234"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.32em] hover:text-accent"
              >
                Open in Google Maps <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="border border-border/70 bg-card p-8 md:p-12"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent">
                Consultation intake
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                {submitted ? "Thank you — we'll be in touch." : "Tell us about the project."}
              </h2>

              {submitted ? (
                <p className="mt-8 text-base leading-[1.75] text-muted-foreground">
                  A project director will respond to your enquiry within one working day.
                  For urgent matters, call the studio on +971 4 227 6206.
                </p>
              ) : (
                <div className="mt-10 space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Field label="Name" name="name" required />
                    <Field label="Company" name="company" />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>

                  <SelectField label="Sector" name="sector" options={sectors} />
                  <div className="grid gap-8 md:grid-cols-2">
                    <SelectField label="Scope" name="scope" options={scopes} />
                    <SelectField label="Indicative budget" name="budget" options={budgets} />
                  </div>
                  <Field label="Site location" name="location" placeholder="City, area or address" />
                  <Field label="Target opening date" name="date" type="text" placeholder="Month, year" />

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                      Project brief
                    </label>
                    <textarea
                      name="brief"
                      rows={5}
                      required
                      placeholder="A few lines about the space, the ambition, and where you are in the programme."
                      className="mt-4 w-full border-b border-border bg-transparent py-3 text-base leading-relaxed outline-none transition focus:border-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-4 border border-foreground bg-foreground px-7 py-4 text-[11px] uppercase tracking-[0.32em] text-background transition hover:bg-transparent hover:text-foreground md:w-auto"
                  >
                    Submit the enquiry <span aria-hidden>→</span>
                  </button>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    By submitting this form you agree to be contacted by a project
                    director from Elden Interior Design LLC. We don't share
                    enquiry details with third parties.
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="min-h-[420px] overflow-hidden border border-border/70">
            <iframe
              title="Elden studio location"
              src="https://maps.google.com/maps?cid=18178852521169327234&z=17&output=embed"
              className="h-full min-h-[420px] w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-4 w-full border-b border-border bg-transparent py-3 text-base leading-relaxed outline-none transition focus:border-foreground"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="mt-4 w-full appearance-none border-b border-border bg-transparent py-3 text-base leading-relaxed outline-none transition focus:border-foreground"
      >
        <option value="" disabled>
          Select —
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
