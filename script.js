document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal for content blocks, with a no-motion fallback.
const revealItems = document.querySelectorAll(".section-block, .timeline-item, .project-card, .skill-group");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
}
