// Run: node --experimental-strip-types src/scripts/enquiry.test.mjs
import assert from "node:assert";
import { buildEnquiry } from "./enquiry.ts";

const form = (fields) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) [v].flat().forEach((x) => f.append(k, x));
  return f;
};
const base = { name: "Sara\r\nBcc: x", email: "sara@example.com", country: "AE", phone: "50 123 4567" };
const project = {
  ...base,
  type: "project",
  scope: ["Design", "Joinery"],
  sector: "Retail",
  location: "Dubai Mall",
  timeline: "3–6 months",
  message: "A 2,000 sq ft store.",
};

const ok = buildEnquiry(form(project));
assert.equal(ok.subject, "New project — Sara Bcc: x", "newlines stripped from subject");
assert.match(ok.text, /Services: Design, Joinery/);
assert.equal(ok.replyTo, "sara@example.com");

assert.match(ok.text, /Phone: \+971 50 123 4567/, "country code joined to the number");
assert.match(buildEnquiry(form({ ...project, country: "AG" })).text, /Phone: \+1 268 50 123 4567/, "NANP area code");
assert("error" in buildEnquiry(form({ ...project, country: "ZZ" })), "unknown country");
assert("error" in buildEnquiry(form({ ...project, phone: "+971 50 123 4567" })), "number excludes the code");
assert("error" in buildEnquiry(form({ ...project, scope: [] })), "project needs a service");
assert("error" in buildEnquiry(form({ ...project, scope: ["Hacking"] })), "unknown services ignored");
assert("error" in buildEnquiry(form({ ...project, sector: "Nope" })), "sector must be from the list");
assert("error" in buildEnquiry(form({ ...project, type: "bogus" })), "unknown type");
assert("error" in buildEnquiry(form({ ...base, type: "supplier", message: "Tiles" })), "supplier needs company");
assert("spam" in buildEnquiry(form({ ...project, nickname: "bot" })), "honeypot");
assert("subject" in buildEnquiry(form({ ...base, type: "general", message: "Hello" })));

const careers = { ...base, type: "careers", role: "Site engineer", message: "Hi" };
const cv = (name, bytes) => new File([new Uint8Array(bytes)], name);
assert.equal(buildEnquiry(form({ ...careers, cv: cv("me.pdf", 1000) })).attachment?.name, "me.pdf");
assert("error" in buildEnquiry(form(careers)), "CV required");
assert("error" in buildEnquiry(form({ ...careers, cv: cv("me.exe", 1000) })), "CV must be pdf/doc");
assert("error" in buildEnquiry(form({ ...careers, cv: cv("me.pdf", 5 * 1024 * 1024 + 1) })), "CV size cap");

console.log("enquiry ok");
