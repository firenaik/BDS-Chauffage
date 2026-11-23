// Mobile menu and footer year.
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setMenuOpen(open) {
  header.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}

toggle.addEventListener("click", () => {
  setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("is-open")) {
    setMenuOpen(false);
    toggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) setMenuOpen(false);
});

window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});

// Animated scrolling to in-page anchors.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let scrollAnimation = 0;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function stopScrollAnimation() {
  cancelAnimationFrame(scrollAnimation);
  scrollAnimation = 0;
}

function scrollToSection(target) {
  stopScrollAnimation();
  const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const end = Math.min(
    Math.max(target.getBoundingClientRect().top + window.scrollY - offset, 0),
    maxScroll,
  );
  const start = window.scrollY;
  const distance = end - start;

  if (reducedMotion.matches || Math.abs(distance) < 2) {
    window.scrollTo(0, end);
    return;
  }

  // Longer trips take a little longer, within bounds.
  const duration = Math.min(Math.max(Math.abs(distance) * 0.4, 500), 1200);
  let startTime;

  function step(now) {
    startTime ??= now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    scrollAnimation = progress < 1 ? requestAnimationFrame(step) : 0;
  }

  scrollAnimation = requestAnimationFrame(step);
}

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
  const link = event.target.closest('a[href^="#"]');
  const id = link?.getAttribute("href").slice(1);
  const target = id && document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  scrollToSection(target);
  history.pushState(null, "", `#${id}`);

  // Move keyboard and screen reader focus to the section, without a second scroll.
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
});

// Legal notice: bring the text into view when it opens, and open it for a #mentions-legales link.
const legal = document.getElementById("mentions-legales");

legal.addEventListener("toggle", () => {
  if (legal.open) scrollToSection(legal);
});

if (location.hash === "#mentions-legales") legal.open = true;

// The visitor takes over: the animation stops instead of fighting them.
for (const type of ["wheel", "touchstart", "keydown"]) {
  window.addEventListener(type, () => scrollAnimation && stopScrollAnimation(), { passive: true });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
