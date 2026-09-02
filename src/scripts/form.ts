// Shared client-side validation for UI-only forms (no backend wired yet).
// On failed submit: shows a focusable, linked error summary and keeps
// inline field errors. On success: swaps the form for a confirmation
// message. Validates on blur so errors don't appear before the user has
// had a chance to finish typing.
export function initFormValidation(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return;

  const summary = document.getElementById(`${formId}-error-summary`);
  const successEl = document.getElementById(`${formId}-success`);

  const fieldError = (el: HTMLElement) => document.getElementById(`${el.id}-error`);

  const validateField = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    const err = fieldError(el);
    const valid = el.checkValidity();
    if (err) err.textContent = valid ? "" : el.validationMessage || "This field is required.";
    el.setAttribute("aria-invalid", valid ? "false" : "true");
    return valid;
  };

  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[required]").forEach((el) => {
    el.addEventListener("blur", () => validateField(el));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[required]"),
    );
    const invalid = required.filter((el) => !validateField(el));

    if (invalid.length) {
      if (summary) {
        summary.hidden = false;
        summary.innerHTML = "";
        const list = document.createElement("ul");
        list.className = "mt-[8px] list-disc pl-[20px]";
        invalid.forEach((el) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = `#${el.id}`;
          link.className = "cursor-pointer underline";
          link.textContent = el.dataset.label || el.name || "Field";
          link.addEventListener("click", (ev) => {
            ev.preventDefault();
            el.focus();
          });
          li.appendChild(link);
          list.appendChild(li);
        });
        summary.appendChild(list);
        summary.setAttribute("tabindex", "-1");
        summary.focus();
      } else {
        invalid[0]?.focus();
      }
      return;
    }

    if (summary) summary.hidden = true;
    form.hidden = true;
    if (successEl) {
      successEl.hidden = false;
      successEl.setAttribute("tabindex", "-1");
      successEl.focus();
    }
  });
}
