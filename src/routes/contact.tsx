import { createFileRoute } from "@tanstack/react-router";
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
                  <a className="hover:text-elden-blue" href="tel:+97142276206">
                    +971 4 227 6206
                  </a>
                  <br />
                  <a className="hover:text-elden-blue" href="mailto:info@eldenuae.com">
                    info@eldenuae.com
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">Directions</p>
                <p className="mt-3">
                  <a
                    href="https://maps.google.com/maps?cid=18178852521169327234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-elden-blue px-5 py-3 font-semibold text-white hover:opacity-90"
                  >
                    Open in Google Maps
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="min-h-[400px] overflow-hidden rounded-sm border border-border">
            <iframe
              title="Elden studio location"
              src="https://maps.google.com/maps?cid=18178852521169327234&z=17&output=embed"
              className="h-full min-h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
