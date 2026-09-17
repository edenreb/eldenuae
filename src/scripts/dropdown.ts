// Custom dropdown: a <details data-select> whose panel ([data-options]) holds
// real radios, so arrow keys, validation and FormData all stay native.
// Picking with the pointer closes the panel; with the keyboard, arrows pick
// and Enter or Escape closes it. The summary's [data-value] shows the pick
// (a radio's data-label, else its value). An optional [data-filter] input
// narrows labels carrying data-search, with [data-empty] shown on no match.
// Styling for [data-mark], .swap and .dropdown lives in global.css.
export function initDropdowns(root: ParentNode) {
  const menus = [...root.querySelectorAll<HTMLDetailsElement>("details[data-select]")];

  menus.forEach((menu) => {
    const summary = menu.querySelector("summary")!;
    const value = menu.querySelector<HTMLElement>("[data-value]")!;
    const filter = menu.querySelector<HTMLInputElement>("[data-filter]");
    const labels = [...menu.querySelectorAll<HTMLLabelElement>("label[data-search]")];
    const empty = menu.querySelector<HTMLElement>("[data-empty]");
    let pointer = false;
    const close = () => {
      menu.open = false;
      summary.focus();
    };
    const radios = () => labels.filter((l) => !l.hidden).map((l) => l.querySelector("input")!);

    menu.querySelector("[data-options]")!.addEventListener("pointerdown", () => (pointer = true));
    menu.addEventListener("change", (e) => {
      const picked = e.target as HTMLInputElement;
      if (picked.type !== "radio") return;
      value.textContent = picked.dataset.label ?? picked.value;
      value.classList.remove("swap");
      void value.offsetWidth; // restart the animation on every pick
      value.classList.add("swap");
      value.classList.replace("text-ghost", "text-paper");
      if (pointer) close();
      pointer = false;
    });

    menu.addEventListener("keydown", (e) => {
      pointer = false;
      // From the filter, ArrowDown steps into the list and picks the first
      // match (or keeps the current pick if it's still showing), as arrow
      // keys do between radios.
      if (e.target === filter && e.key === "ArrowDown") {
        e.preventDefault();
        const visible = radios();
        const target = visible.find((r) => r.checked) ?? visible[0];
        if (!target) return;
        target.focus();
        if (!target.checked) {
          target.checked = true;
          target.dispatchEvent(new Event("change", { bubbles: true }));
        }
        return;
      }
      if (menu.open && (e.key === "Enter" || e.key === "Escape")) {
        e.preventDefault();
        close();
      }
    });

    if (filter) {
      filter.addEventListener("input", () => {
        const q = filter.value.trim().toLowerCase();
        labels.forEach((l) => (l.hidden = !l.dataset.search!.includes(q)));
        if (empty) empty.hidden = radios().length > 0;
      });
      menu.addEventListener("toggle", () => {
        if (menu.open) {
          filter.focus();
          menu.querySelector("input:checked")?.closest("label")?.scrollIntoView({ block: "nearest" });
        } else if (filter.value) {
          filter.value = "";
          filter.dispatchEvent(new Event("input"));
        }
      });
    }

    // Ignore focus moving to an ancestor: pressing an option label (not
    // focusable) hands focus to <main tabindex="-1">, and closing here would
    // hide the option before its click lands. Outside clicks are handled by
    // the pointerdown listener below.
    menu.addEventListener("focusout", (e) => {
      const to = e.relatedTarget as Node | null;
      if (to && !menu.contains(to) && !to.contains(menu)) menu.open = false;
    });
  });

  // One open menu at a time, and a click anywhere else closes it. On <body>
  // so the listener is swapped out with the page.
  if (menus.length)
    document.body.addEventListener("pointerdown", (e) => {
      menus.forEach((d) => {
        if (d.open && !d.contains(e.target as Node)) d.open = false;
      });
    });
}
