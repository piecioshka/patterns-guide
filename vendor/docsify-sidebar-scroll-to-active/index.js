(function () {
  const SELECTORS = {
    sidebar: "aside.sidebar",
    activeLink: "li.active > a",
    activeItem: "li.active",
  };

  /**
   * @typedef {{ ready: (cb: () => void) => void }} DocsifyHook
   * @typedef {(hook: DocsifyHook) => void} DocsifyPlugin
   * @typedef {{ plugins?: DocsifyPlugin[] }} DocsifyConfig
   */

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} container
   */
  function offsetTopWithin(element, container) {
    let offset = 0;
    /** @type {HTMLElement | null} */
    let node = element;
    while (node && node !== container) {
      offset += node.offsetTop;
      /** @type {Element | null} */
      const parent = node.offsetParent;
      node = parent instanceof HTMLElement ? parent : null;
    }
    return offset;
  }

  function scrollSidebarToActive() {
    const sidebar = document.querySelector(SELECTORS.sidebar);
    if (!(sidebar instanceof HTMLElement)) return;

    const active =
      sidebar.querySelector(SELECTORS.activeLink) ||
      sidebar.querySelector(SELECTORS.activeItem);
    if (!(active instanceof HTMLElement)) return;

    const offset = offsetTopWithin(active, sidebar);
    sidebar.scrollTop = offset - sidebar.clientHeight / 2 + active.clientHeight / 2;
  }

  /** @type {Window & { $docsify?: DocsifyConfig }} */
  const w = window;
  const docsify = w.$docsify || (w.$docsify = {});
  /** @type {DocsifyPlugin} */
  const plugin = function (hook) {
    hook.ready(function () {
      requestAnimationFrame(scrollSidebarToActive);
    });
  };
  docsify.plugins = [plugin].concat(docsify.plugins || []);
})();
