// Cloudflare Worker entry (see wrangler.jsonc). Every request goes to the
// static build in dist/ except POST /api/contact, which validates the contact
// form and emails it through Resend.
//
// Worker → Settings → Variables and Secrets:
//   RESEND_API_KEY  (secret)  from resend.com, domain eldenuae.com verified
//   CONTACT_TO      in wrangler.jsonc, defaults to info@eldenuae.com
//   CONTACT_FROM    optional, defaults to "Elden website <website@eldenuae.com>"
import { buildEnquiry } from "./src/scripts/enquiry";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

export default {
  async fetch(request: Request, env: Env) {
    if (new URL(request.url).pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
    return contact(request, env);
  },
};

async function contact(request: Request, env: Env) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }

  const enquiry = buildEnquiry(form);
  // ponytail: honeypot only. Add Cloudflare Turnstile if spam gets through.
  if ("spam" in enquiry) return Response.json({ ok: true });
  if ("error" in enquiry) return Response.json({ error: enquiry.error }, { status: 400 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Elden website <website@eldenuae.com>",
      to: env.CONTACT_TO || "info@eldenuae.com",
      reply_to: enquiry.replyTo,
      subject: enquiry.subject,
      text: enquiry.text,
      attachments: enquiry.attachment && [
        { filename: enquiry.attachment.name, content: toBase64(await enquiry.attachment.arrayBuffer()) },
      ],
    }),
  });

  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text());
    return Response.json({ error: "We couldn't send that just now." }, { status: 502 });
  }
  return Response.json({ ok: true });
}

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  // Chunked: spreading a whole file into fromCharCode overflows the stack.
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}
