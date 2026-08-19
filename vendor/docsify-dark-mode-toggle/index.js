/*
 * Dark mode toggle.
 *
 * Optional configuration is read from window.$docsify.darkMode. All fields are
 * optional; defaults are used when missing:
 *
 *   window.$docsify = {
 *     // ...other docsify options...
 *     darkMode: {
 *       storageKey: "color-scheme",               // localStorage key
 *       messages: {                               // merged with built-in en/pl
 *         pl: { enable: "...", disable: "..." },
 *       },
 *       sunIcon: "<svg ...>...</svg>",            // SVG string (overrides default)
 *       moonIcon: "<svg ...>...</svg>",
 *     },
 *   };
 */
(function () {
  /**
   * @typedef {{ enable: string; disable: string }} DarkModeMessages
   * @typedef {{
   *   storageKey?: string;
   *   messages?: Record<string, Partial<DarkModeMessages>>;
   *   sunIcon?: string | SVGElement;
   *   moonIcon?: string | SVGElement;
   * }} DarkModeConfig
   */

  const DEFAULTS = {
    storageKey: "color-scheme",
    /** @type {Record<string, DarkModeMessages>} */
    messages: {
      en: { enable: "Enable dark mode", disable: "Disable dark mode" },
      pl: { enable: "Włącz tryb nocny", disable: "Wyłącz tryb nocny" },
    },
  };
  const DARK_CLASS = "dark-mode";
  const STORAGE_DARK = "dark";
  const STORAGE_LIGHT = "light";
  const SVG_NS = "http://www.w3.org/2000/svg";

  const docsifyHost = /** @type {Window & { $docsify?: { darkMode?: DarkModeConfig } }} */ (
    window
  );
  /** @type {DarkModeConfig} */
  const userConfig = docsifyHost.$docsify?.darkMode || {};
  const storageKey = userConfig.storageKey || DEFAULTS.storageKey;
  /** @type {Record<string, DarkModeMessages>} */
  const messages = { ...DEFAULTS.messages };
  if (userConfig.messages) {
    for (const [loc, msgs] of Object.entries(userConfig.messages)) {
      messages[loc] = { ...(messages[loc] || messages.en), ...msgs };
    }
  }

  const storage = {
    get() {
      try {
        return localStorage.getItem(storageKey);
      } catch {
        return null;
      }
    },
    set(/** @type {string} */ value) {
      try {
        localStorage.setItem(storageKey, value);
      } catch {}
    },
  };

  /**
   * @param {string} tag
   * @param {Record<string, string>} attrs
   * @param {SVGElement[]} [children]
   */
  function svgEl(tag, attrs, children) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [name, value] of Object.entries(attrs)) {
      el.setAttribute(name, value);
    }
    if (children) {
      for (const child of children) el.appendChild(child);
    }
    return el;
  }

  /**
   * @param {SVGElement[]} children
   */
  function buildIcon(children) {
    return svgEl(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true",
      },
      children,
    );
  }

  const defaultSunIcon = buildIcon([
    svgEl("circle", { cx: "12", cy: "12", r: "4" }),
    svgEl("line", { x1: "12", y1: "2", x2: "12", y2: "4" }),
    svgEl("line", { x1: "12", y1: "20", x2: "12", y2: "22" }),
    svgEl("line", { x1: "2", y1: "12", x2: "4", y2: "12" }),
    svgEl("line", { x1: "20", y1: "12", x2: "22", y2: "12" }),
    svgEl("line", { x1: "4.93", y1: "4.93", x2: "6.34", y2: "6.34" }),
    svgEl("line", { x1: "17.66", y1: "17.66", x2: "19.07", y2: "19.07" }),
    svgEl("line", { x1: "4.93", y1: "19.07", x2: "6.34", y2: "17.66" }),
    svgEl("line", { x1: "17.66", y1: "6.34", x2: "19.07", y2: "4.93" }),
  ]);

  const defaultMoonIcon = buildIcon([
    svgEl("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }),
  ]);

  /**
   * @param {unknown} input
   * @param {SVGElement} fallback
   */
  function parseIcon(input, fallback) {
    if (input instanceof SVGElement) return input;
    if (typeof input === "string" && input.trim()) {
      const doc = new DOMParser().parseFromString(input.trim(), "image/svg+xml");
      const root = doc.documentElement;
      if (root && root.nodeName.toLowerCase() === "svg" && !doc.querySelector("parsererror")) {
        return /** @type {SVGElement} */ (/** @type {unknown} */ (root));
      }
    }
    return fallback;
  }

  const sunIcon = parseIcon(userConfig.sunIcon, defaultSunIcon);
  const moonIcon = parseIcon(userConfig.moonIcon, defaultMoonIcon);

  const rawLocale = document.documentElement.lang || navigator.language || "en";
  const locale = rawLocale.toLowerCase().split("-")[0];
  const i18n = messages[locale] || messages.en;
  const darkQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

  function isDarkActive() {
    return document.documentElement.classList.contains(DARK_CLASS);
  }

  function resolveInitialDark() {
    const stored = storage.get();
    if (stored !== null) return stored === STORAGE_DARK;
    return !!darkQuery?.matches;
  }

  /**
   * @param {HTMLButtonElement} button
   * @param {boolean} isDark
   */
  function render(button, isDark) {
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
    const label = isDark ? i18n.disable : i18n.enable;
    button.replaceChildren(isDark ? sunIcon : moonIcon);
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  function createButton() {
    const btn = document.createElement("button");
    btn.className = "dark-mode-toggle";
    btn.type = "button";
    return btn;
  }

  function init() {
    const existing = document.querySelector(".dark-mode-toggle");
    const button =
      existing instanceof HTMLButtonElement ? existing : createButton();
    if (!existing) document.body.appendChild(button);

    render(button, resolveInitialDark());

    button.addEventListener("click", () => {
      const next = !isDarkActive();
      storage.set(next ? STORAGE_DARK : STORAGE_LIGHT);
      render(button, next);
    });

    darkQuery?.addEventListener("change", (event) => {
      if (storage.get() === null) render(button, event.matches);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
