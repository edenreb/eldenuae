// One source of truth for the contact form: the page renders its options
// from these lists and functions/api/contact.ts validates against them.

export const INQUIRIES = {
  project: "New project",
  careers: "Careers",
  supplier: "Supplier / subcontractor",
  general: "General / press",
} as const;
export type Inquiry = keyof typeof INQUIRIES;

export const SCOPES = ["Design", "Fitout", "MEP works", "Joinery", "Full interior fitout"];
export const SECTORS = ["Fitness", "F&B", "Retail", "Workplace", "Hospitality", "Other"];
export const TIMELINES = ["As soon as possible", "Within 3 months", "3–6 months", "6+ months", "Just exploring"];

// Extra fields per inquiry, in the order they appear in the email.
// [name, label, required, allowed values]
type Field = [string, string, boolean, string[]?];
export const FIELDS: Record<Inquiry, Field[]> = {
  project: [
    ["company", "Company", false],
    ["sector", "Sector", true, SECTORS],
    ["location", "Project location", true],
    ["size", "Size (sq ft)", false],
    ["timeline", "Timeline", true, TIMELINES],
    ["budget", "Budget (AED)", false],
    ["message", "About the project", true],
  ],
  careers: [
    ["role", "Role", true],
    ["portfolio", "Portfolio / LinkedIn", false],
    ["message", "About you", true],
  ],
  supplier: [
    ["company", "Company", true],
    ["trade", "Trade / category", true],
    ["website", "Website", false],
    ["message", "What you offer", true],
  ],
  general: [["message", "Message", true]],
};

// Country code required: "+971 50 123 4567".
export const PHONE_PATTERN = "\\+[1-9][0-9 \\-]{6,18}";
const PHONE = new RegExp(`^${PHONE_PATTERN}$`);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// CVs ride along as email attachments. The 5 MB cap keeps base64 encoding
// inside the Workers free-plan CPU budget.
export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_REQUIRED = true;
export const CV_ACCEPT = ".pdf,.doc,.docx";

export type Enquiry =
  | { subject: string; text: string; replyTo: string; attachment?: File }
  | { error: string }
  | { spam: true };

export function buildEnquiry(form: FormData): Enquiry {
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 3000);

  // Hidden honeypot — people never see it, bots fill every field.
  if (get("nickname")) return { spam: true };

  const type = get("type") as Inquiry;
  if (!(type in INQUIRIES)) return { error: "Choose what your enquiry is about." };

  const name = get("name").replace(/\s+/g, " ");
  const email = get("email");
  const phone = get("phone");
  if (!name) return { error: "Name is required." };
  if (!EMAIL.test(email)) return { error: "Enter a valid email address." };
  if (!PHONE.test(phone)) return { error: "Enter a phone number with its country code, e.g. +971 50 123 4567." };

  const lines = [`Enquiry: ${INQUIRIES[type]}`, `Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`];

  if (type === "project") {
    const scope = form.getAll("scope").map(String).filter((s) => SCOPES.includes(s));
    if (!scope.length) return { error: "Choose at least one service." };
    lines.push(`Services: ${scope.join(", ")}`);
  }

  let attachment: File | undefined;
  if (type === "careers") {
    const cv = form.get("cv");
    if (cv instanceof File && cv.size > 0) {
      if (!/\.(pdf|docx?)$/i.test(cv.name)) return { error: "Your CV must be a PDF or Word document." };
      if (cv.size > CV_MAX_BYTES) return { error: "Your CV must be 5 MB or smaller." };
      attachment = cv;
      lines.push(`CV: ${cv.name} (attached)`);
    } else if (CV_REQUIRED) return { error: "Attach your CV." };
  }

  for (const [key, label, required, allowed] of FIELDS[type]) {
    const value = get(key);
    if (required && !value) return { error: `${label} is required.` };
    if (value && allowed && !allowed.includes(value)) return { error: `Choose a valid ${label.toLowerCase()}.` };
    if (value) lines.push(key === "message" ? `\n${label}:\n${value}` : `${label}: ${value}`);
  }

  return { subject: `${INQUIRIES[type]} — ${name}`, text: lines.join("\n"), replyTo: email, attachment };
}
