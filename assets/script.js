const navToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

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
