(function () {
  const STORAGE_KEY = "color-scheme";
  const DARK_CLASS = "dark-mode";
  const ICON_DARK = "☀️";
  const ICON_LIGHT = "🌙";

  /**
   * @type {Record<string, { enable: string; disable: string }>}
   */
  const messages = {
    en: { enable: "Enable dark mode", disable: "Disable dark mode" },
    pl: { enable: "Włącz tryb nocny", disable: "Wyłącz tryb nocny" },
  };

  const storage = {
    get() {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    },
    set(/** @type {string} */ value) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {}
    },
  };

  const locale = document.documentElement.lang || navigator.language || "en";
  const i18n = messages[locale] || messages.en;
  const darkQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

  const stored = storage.get();
  const initialDark = stored === null ? !!darkQuery?.matches : stored === "1";

  /** @type {HTMLElement | null} */
  let button = null;

  function apply(/** @type {boolean} */ isDark) {
    document.body.classList.toggle(DARK_CLASS, isDark);
    if (!button) return;
    const label = isDark ? i18n.disable : i18n.enable;
    button.textContent = isDark ? ICON_DARK : ICON_LIGHT;
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  function toggle() {
    const nextDark = !document.body.classList.contains(DARK_CLASS);
    storage.set(nextDark ? "1" : "0");
    apply(nextDark);
  }

  function createButton() {
    const btn = document.createElement("button");
    btn.className = "dark-mode-toggle";
    btn.type = "button";
    btn.addEventListener("click", toggle);
    return btn;
  }

  function init() {
    button = document.querySelector(".dark-mode-toggle");
    if (!button) {
      button = createButton();
      document.body.appendChild(button);
    }
    apply(initialDark);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  darkQuery?.addEventListener("change", (e) => {
    if (storage.get() === null) apply(e.matches);
  });
})();
