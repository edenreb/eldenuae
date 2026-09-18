// One source of truth for the contact form: the page renders its options
// from these lists and worker.ts validates against them.

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
export const SIZES = ["500–1,000", "1,000–3,000", "3,000–5,000", "5,000+"];
export const BUDGETS = ["150K–500K", "500K–1M", "1M–2M", "2M–5M", "5M+"];

// Extra fields per inquiry, in the order they appear in the email.
// [name, label, required, allowed values]
type Field = [string, string, boolean, string[]?];
export const FIELDS: Record<Inquiry, Field[]> = {
  project: [
    ["company", "Company", false],
    ["sector", "Sector", true, SECTORS],
    ["location", "Project location", true],
    ["size", "Size (sq ft)", false, SIZES],
    ["timeline", "Timeline", true, TIMELINES],
    ["budget", "Budget (AED)", false, BUDGETS],
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

// Dialling codes by ISO 3166 region. Keyed by region, not code, because
// several countries share one (+1, +7, +44); names come from
// Intl.DisplayNames. NANP territories carry their area code ("1 268").
const DIAL = `AF 93|AL 355|DZ 213|AS 1 684|AD 376|AO 244|AI 1 264|AG 1 268|AR 54|AM 374|AW 297|AU 61|AT 43|AZ 994|BS 1 242|BH 973|BD 880|BB 1 246|BY 375|BE 32|BZ 501|BJ 229|BM 1 441|BT 975|BO 591|BA 387|BW 267|BR 55|VG 1 284|BN 673|BG 359|BF 226|BI 257|KH 855|CM 237|CA 1|CV 238|KY 1 345|CF 236|TD 235|CL 56|CN 86|CO 57|KM 269|CG 242|CD 243|CK 682|CR 506|CI 225|HR 385|CU 53|CW 599|CY 357|CZ 420|DK 45|DJ 253|DM 1 767|DO 1 809|EC 593|EG 20|SV 503|GQ 240|ER 291|EE 372|SZ 268|ET 251|FK 500|FO 298|FJ 679|FI 358|FR 33|GF 594|PF 689|GA 241|GM 220|GE 995|DE 49|GH 233|GI 350|GR 30|GL 299|GD 1 473|GP 590|GU 1 671|GT 502|GG 44|GN 224|GW 245|GY 592|HT 509|HN 504|HK 852|HU 36|IS 354|IN 91|ID 62|IR 98|IQ 964|IE 353|IM 44|IL 972|IT 39|JM 1 876|JP 81|JE 44|JO 962|KZ 7|KE 254|KI 686|XK 383|KW 965|KG 996|LA 856|LV 371|LB 961|LS 266|LR 231|LY 218|LI 423|LT 370|LU 352|MO 853|MG 261|MW 265|MY 60|MV 960|ML 223|MT 356|MH 692|MQ 596|MR 222|MU 230|YT 262|MX 52|FM 691|MD 373|MC 377|MN 976|ME 382|MS 1 664|MA 212|MZ 258|MM 95|NA 264|NR 674|NP 977|NL 31|NC 687|NZ 64|NI 505|NE 227|NG 234|NU 683|KP 850|MK 389|MP 1 670|NO 47|OM 968|PK 92|PW 680|PS 970|PA 507|PG 675|PY 595|PE 51|PH 63|PL 48|PT 351|PR 1 787|QA 974|RE 262|RO 40|RU 7|RW 250|KN 1 869|LC 1 758|VC 1 784|WS 685|SM 378|ST 239|SA 966|SN 221|RS 381|SC 248|SL 232|SG 65|SX 1 721|SK 421|SI 386|SB 677|SO 252|ZA 27|KR 82|SS 211|ES 34|LK 94|SD 249|SR 597|SE 46|CH 41|SY 963|TW 886|TJ 992|TZ 255|TH 66|TL 670|TG 228|TO 676|TT 1 868|TN 216|TR 90|TM 993|TC 1 649|TV 688|UG 256|UA 380|AE 971|GB 44|US 1|UY 598|VI 1 340|UZ 998|VU 678|VA 39|VE 58|VN 84|YE 967|ZM 260|ZW 263`;
export const COUNTRY_CODES: Record<string, string> = Object.fromEntries(
  DIAL.split("|").map((entry) => [entry.slice(0, 2), `+${entry.slice(3)}`]),
);
export const DEFAULT_COUNTRY = "AE";

// The number without its country code: digits, spaces and dashes.
export const PHONE_PATTERN = "[0-9][0-9 \\-]{4,16}";
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
  const dial = COUNTRY_CODES[get("country")];
  const number = get("phone");
  if (!name) return { error: "Name is required." };
  if (!EMAIL.test(email)) return { error: "Enter a valid email address." };
  if (!dial) return { error: "Choose your country code." };
  if (!PHONE.test(number)) return { error: "Enter a valid phone number, e.g. 50 123 4567." };
  const phone = `${dial} ${number}`;

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
