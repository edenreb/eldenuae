import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elden Interior Design, Dubai" },
      {
        name: "description",
        content:
          "Elden Interior Design LLC, Al Quoz Industrial Area 2, Dubai. Email info@eldenuae.com or call +971 4 227 6206.",
      },
      { property: "og:title", content: "Contact Elden" },
      {
        property: "og:description",
        content: "Get in touch with the Elden studio in Al Quoz, Dubai.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background">
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Location</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] text-balance md:text-[7.5vw] lg:text-[7rem]">
              Al Quoz,{" "}
              <span className="italic text-elden-blue">Dubai.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Tell us about the space you have in mind. Every project starts with a conversation
              — usually over coffee, at our studio or on your site.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
          {/* Info */}
          <div className="space-y-10">
            <Reveal>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">Studio</p>
                <p className="mt-3 font-display text-2xl leading-snug">
                  Elden Interior Design LLC<br />
                  Al Quoz Industrial Area 2<br />
                  Opposite Planet Eco<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">Get in touch</p>
                <p className="mt-3 font-display text-2xl leading-snug">
                  <a className="hover:text-elden-blue" href="mailto:info@eldenuae.com">
                    info@eldenuae.com
                  </a>
                  <br />
                  <a className="hover:text-elden-blue" href="tel:+97142276206">
                    +971 4 227 6206
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-sm border border-border">
                <iframe
                  title="Elden studio location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=55.22%2C25.12%2C55.26%2C25.16&layer=mapnik&marker=25.14%2C55.24"
                  className="h-72 w-full"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.05}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grain-overlay space-y-5 rounded-sm border border-border bg-card p-8 md:p-10"
            >
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Company (optional)" name="company" required={false} />
              <Field label="Project location" name="location" />
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Tell us about the space
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-sm border border-input bg-background px-4 py-3 text-base focus:border-elden-green focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className="w-full rounded-full bg-elden-blue px-6 py-4 text-sm font-medium text-primary-foreground transition hover:bg-elden-blue-deep disabled:opacity-60"
              >
                {sent ? "Thank you — we'll be in touch shortly." : "Send enquiry"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base focus:border-elden-green focus:outline-none"
      />
    </div>
  );
}
