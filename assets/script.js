const navToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navLinks && !navLinks.querySelector('a[href="/research/"]')) {
  const researchLink = document.createElement("a");
  researchLink.href = "/research/";
  researchLink.textContent = "Research";
  if (window.location.pathname.startsWith("/research/")) {
    researchLink.setAttribute("aria-current", "page");
  }
  const roadmapLink = navLinks.querySelector('a[href="/roadmap/"]');
  navLinks.insertBefore(researchLink, roadmapLink ?? null);
}

const footerLinks = document.querySelector(".footer-links");
if (footerLinks && !footerLinks.querySelector('a[href="/research/"]')) {
  const researchFooterLink = document.createElement("a");
  researchFooterLink.href = "/research/";
  researchFooterLink.textContent = "Research";
  const roadmapFooterLink = footerLinks.querySelector('a[href="/roadmap/"]');
  footerLinks.insertBefore(researchFooterLink, roadmapFooterLink ?? null);
}

const researchRoot =
  window.location.pathname === "/research/" ||
  window.location.pathname === "/research/index.html";
const researchRadar =
  window.location.pathname === "/research/radar/" ||
  window.location.pathname === "/research/radar/index.html";

if (researchRoot) {
  const actions = document.querySelector(".page-hero .page-actions");
  if (actions && !actions.querySelector('a[href="/research/radar/"]')) {
    const radarLink = document.createElement("a");
    radarLink.className = "button";
    radarLink.href = "/research/radar/";
    radarLink.textContent = "Research Radar";
    actions.appendChild(radarLink);
  }
}

if (researchRoot || researchRadar) {
  const actions = document.querySelector(".page-hero .page-actions");
  if (actions && !actions.querySelector('a[href="/research/mechanics/"]')) {
    const mechanicsLink = document.createElement("a");
    mechanicsLink.className = "button";
    mechanicsLink.href = "/research/mechanics/";
    mechanicsLink.textContent = "Studio Mechanics";
    actions.appendChild(mechanicsLink);
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)")
  .matches;
const tiltScope = document.querySelector("[data-tilt-scope]");
const tiltCard = document.querySelector("[data-tilt-card]");

if (motionAllowed && tiltScope && tiltCard) {
  tiltScope.addEventListener("pointermove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tiltCard.style.setProperty("--tilt-x", `${x * 5}deg`);
    tiltCard.style.setProperty("--tilt-y", `${y * -5}deg`);
  });

  tiltScope.addEventListener("pointerleave", () => {
    tiltCard.style.setProperty("--tilt-x", "0deg");
    tiltCard.style.setProperty("--tilt-y", "0deg");
  });
}
