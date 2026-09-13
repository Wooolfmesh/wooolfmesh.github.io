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
const researchMechanics =
  window.location.pathname === "/research/mechanics/" ||
  window.location.pathname === "/research/mechanics/index.html";
const researchBlueprint =
  window.location.pathname === "/research/blueprint/" ||
  window.location.pathname === "/research/blueprint/index.html";

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

if (researchRoot || researchRadar || researchMechanics) {
  const actions = document.querySelector(".page-hero .page-actions");
  if (actions && !actions.querySelector('a[href="/research/blueprint/"]')) {
    const blueprintLink = document.createElement("a");
    blueprintLink.className = "button";
    blueprintLink.href = "/research/blueprint/";
    blueprintLink.textContent = "Product Blueprint";
    actions.appendChild(blueprintLink);
  }
}

if (researchBlueprint) {
  const footer = document.querySelector(".footer-links");
  if (footer && !footer.querySelector('a[href="/research/blueprint/"]')) {
    const blueprintFooterLink = document.createElement("a");
    blueprintFooterLink.href = "/research/blueprint/";
    blueprintFooterLink.textContent = "Product Blueprint";
    const roadmapFooterLink = footer.querySelector('a[href="/roadmap/"]');
    footer.insertBefore(blueprintFooterLink, roadmapFooterLink ?? null);
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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

// Goose ARWP Proof Mark dogfood. Supplemental trust/distribution UI, not a certification or score.
if (!document.querySelector('[data-goose-arwp-proof-mark="0.1"]')) {
  const footer = document.querySelector(".site-footer") || document.querySelector("footer") || document.body;
  const slot = document.createElement("div");
  slot.dataset.gooseArwpProofMarkSlot = "footer";
  slot.style.marginTop = "12px";
  slot.style.padding = "0 16px 16px";
  slot.innerHTML = `<span data-goose-arwp-proof-mark="0.1" data-arwp-coverage="partial" role="group" aria-label="Goose ARWP Proof Mark: partial audit scope" title="ARWP evidence is present; whole-site audit scope remains incomplete." style="display:inline-flex;max-width:100%;min-height:38px;border:1px solid #080c0b;border-radius:4px;overflow:hidden;background:#fafaf7;color:#080c0b;font:10px/1.15 Arial,sans-serif;vertical-align:middle"><a href="https://dkharlanau.github.io/agent-ready-web-profile/product/" aria-label="Open Goose ARWP" style="padding:8px 9px;background:#080c0b;color:#fafaf7;text-decoration:none;border-right:4px solid #173bea;font-weight:700;letter-spacing:.06em">GOOSE ARWP</a><a href="https://github.com/dkharlanau/agent-ready-web-profile/blob/main/docs/PROOF-MARK.md" aria-label="Read Proof Mark contract: partial scope" style="padding:8px 9px;color:#080c0b;text-decoration:none"><strong>PARTIAL</strong> · <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">scope incomplete</span></a></span>`;
  footer.append(slot);
}
