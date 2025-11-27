document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrollLinks();
  initScrollButtons();
  initFlowerClicks();
  initFallingPetals();
  initSectionReveal();
  initLetterTyping();
  initCounter();
  initMusicToggle();
  initSunflowerIntro();
  initLightbox();
});

/* Smooth scroll for in-page anchor links */
function initSmoothScrollLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* Scroll buttons from hero */
function initScrollButtons() {
  const storyBtn = document.getElementById("scrollStory");
  const galleryBtn = document.getElementById("scrollGallery");
  const storySection = document.getElementById("story");
  const gallerySection = document.getElementById("gallery");

  if (storyBtn && storySection) {
    storyBtn.addEventListener("click", () => {
      storySection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (galleryBtn && gallerySection) {
    galleryBtn.addEventListener("click", () => {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* Blooming flowers on click / tap */
function initFlowerClicks() {
  const IGNORE_TAGS = ["BUTTON", "A", "INPUT", "TEXTAREA", "LABEL", "SELECT"];

  window.addEventListener("pointerdown", (event) => {
    const tag = event.target.tagName;
    if (IGNORE_TAGS.includes(tag)) return;
    createFlower(event.clientX, event.clientY);
  });
}

function createFlower(x, y) {
  const flower = document.createElement("span");
  flower.className = "flower";

  const size = 18 + Math.random() * 18;
  flower.style.width = `${size}px`;
  flower.style.height = `${size}px`;
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  document.body.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 1900);
}

/* Continuous falling petals / hearts background */
function initFallingPetals() {
  const maxPetals = 35;
  const intervalMs = 700;

  setInterval(() => {
    const existing = document.querySelectorAll(".falling-petal").length;
    if (existing >= maxPetals) return;
    createFallingPetal();
  }, intervalMs);
}

function createFallingPetal() {
  const petal = document.createElement("span");
  petal.className = "falling-petal";

  const left = Math.random() * 100; // vw
  petal.style.left = `${left}vw`;

  const scale = 0.7 + Math.random() * 0.8;
  petal.style.setProperty("--scale", scale.toFixed(2));

  const duration = 9 + Math.random() * 5;
  petal.style.animationDuration = `${duration}s`;

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, duration * 1000 + 1000);
}

/* Reveal-on-scroll animations */
function initSectionReveal() {
  const revealEls = document.querySelectorAll(".reveal-on-scroll");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* Typewriter effect for letter */
function initLetterTyping() {
  const letterEl = document.getElementById("letterText");
  if (!letterEl) return;

  const fullText = letterEl.dataset.text || letterEl.textContent.trim();
  letterEl.textContent = "";
  letterEl.classList.add("typing");

  let index = 0;

  const typeNext = () => {
    if (index <= fullText.length) {
      letterEl.textContent = fullText.slice(0, index);
      index += 1;
      setTimeout(typeNext, 35); // typing speed (ms)
    } else {
      letterEl.classList.add("letter-finished");
      letterEl.classList.remove("typing");
    }
  };

  if (!("IntersectionObserver" in window)) {
    typeNext();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeNext();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(letterEl);
}

/* Days-in-love counter */
function initCounter() {
  const daysEl = document.getElementById("daysNumber");
  const dateLabel = document.getElementById("startDateLabel");
  if (!daysEl) return;

  // 🔧 CHANGE THIS DATE to your real date (YYYY-MM-DD)
  const startDateString = "2025-08-02";

  const startDate = new Date(startDateString + "T00:00:00");
  if (dateLabel) {
    dateLabel.textContent = startDateString;
  }

  function updateCounter() {
    const now = new Date();
    const diffMs = now - startDate;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (!Number.isNaN(days)) {
      daysEl.textContent = String(days).padStart(3, "0");
    }
  }

  updateCounter();
}

/* Background music toggle */
function initMusicToggle() {
  const toggleBtn = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");

  if (!toggleBtn || !audio) return;

  audio.volume = 0.5;

  toggleBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        toggleBtn.textContent = "❚❚ music";
        toggleBtn.classList.add("is-playing");
      } else {
        audio.pause();
        toggleBtn.textContent = "▷ music";
        toggleBtn.classList.remove("is-playing");
      }
    } catch (err) {
      console.warn("Could not play music:", err);
    }
  });
}

/* Sunflower intro: hide on scroll / tap / timeout */
function initSunflowerIntro() {
  const intro = document.getElementById("sunflowerIntro");
  if (!intro) return;

  let hidden = false;

  const hide = () => {
    if (hidden) return;
    hidden = true;
    intro.classList.add("sunflower-intro--hidden");
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      hide();
    }
  });

  intro.addEventListener("click", hide);

  // Auto-hide after a few seconds just in case
  setTimeout(hide, 9000);
}

/* Lightbox for gallery images */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = document.getElementById("lightboxImage");
  const captionEl = document.getElementById("lightboxCaption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");
  const triggers = document.querySelectorAll(".js-lightbox-trigger");

  const open = (src, caption, altText) => {
    if (!src) return;
    imgEl.src = src;
    imgEl.alt = altText || caption || "";
    captionEl.textContent = caption || altText || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll-lightbox");
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll-lightbox");
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const full = trigger.dataset.full || trigger.querySelector("img")?.src;
      const caption = trigger.dataset.caption;
      const alt = trigger.querySelector("img")?.alt;
      open(full, caption, alt);
    });
  });

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });
}
