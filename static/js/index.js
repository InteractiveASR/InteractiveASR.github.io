function setupRevealAnimation() {
  const revealNodes = document.querySelectorAll(".reveal");
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
    { threshold: 0.14 }
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
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      Object.entries(panels).forEach(([key, panel]) => {
        const isActive = key === activeKey;
        if (!panel) {
          return;
        }
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

function setupCopyButton() {
  const button = document.querySelector(".copy-bibtex-btn");
  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    const targetId = button.dataset.copyTarget;
    const target = document.getElementById(targetId);
    const label = button.querySelector(".copy-text");
    if (!target || !label) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent);
      button.classList.add("is-copied");
      label.textContent = "Copied";
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        label.textContent = "Copy";
      }, 1800);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  });
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = links
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      sections.forEach(({ link, target }) => {
        link.classList.toggle("is-active", target === visible.target);
      });
    },
    {
      rootMargin: "-30% 0px -50% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach(({ target }) => observer.observe(target));
}

document.addEventListener("DOMContentLoaded", () => {
  setupRevealAnimation();
  setupDemoTabs();
  setupCopyButton();
  setupActiveNav();
});
