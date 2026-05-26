function setupRevealAnimation() {
  const revealNodes = document.querySelectorAll(".hero-body, .section");
  if (!revealNodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupDemoTabs() {
  const tabs = document.querySelectorAll("[data-demo-tab]");
  const panels = {
    zh: document.getElementById("demo-zh"),
    en: document.getElementById("demo-en"),
    cs: document.getElementById("demo-cs"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const activeKey = tab.dataset.demoTab;

      tabs.forEach((button) => {
        const isActive = button === tab;
        button.classList.toggle("active", isActive);
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) {
          return;
        }
        const isActive = key === activeKey;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupRevealAnimation();
  setupDemoTabs();
});
