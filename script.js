document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", false);
  });
});

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => observer.observe(el));

const navLinks = nav.querySelectorAll("a[href^='#']");
const sections = Array.from(navLinks)
  .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
  .filter(Boolean);

function setActiveLink(link) {
  navLinks.forEach((l) => l.classList.remove("is-active"));
  if (link) link.classList.add("is-active");
}

function isAtBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
}

const spyObserver = new IntersectionObserver(
  (entries) => {
    if (isAtBottom()) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(nav.querySelector(`a[href="#${entry.target.id}"]`));
      }
    });
  },
  { rootMargin: "0px 0px -60% 0px" }
);

sections.forEach((section) => spyObserver.observe(section));

// The last section's top may never cross the observer's trigger line once
// the page can't scroll further, so force it active at the bottom instead.
window.addEventListener(
  "scroll",
  () => {
    if (isAtBottom()) setActiveLink(navLinks[navLinks.length - 1]);
  },
  { passive: true }
);
