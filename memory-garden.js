// MEMORY GARDEN INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".garden-card"));
  const portalButton = document.getElementById("portal-button");
  const quotePopup = document.getElementById("quote-popup");
  const quoteTextEl = quotePopup?.querySelector(".quote-text");
  const quoteClose = quotePopup?.querySelector(".quote-close");

  const galaxyTransition = document.getElementById("galaxy-transition");
  const galaxySection = document.getElementById("galaxy-section");
  const bgMusic = document.getElementById("bg-music");

  const BLOOM_DURATION_MS = 2200;

  let completedCount = 0;
  let musicStarted = false;

  function startMusic() {
    if (musicStarted || !bgMusic) return;
    bgMusic
      .play()
      .then(() => {
        musicStarted = true;
      })
      .catch(() => {
        // If autoplay is blocked, just quietly ignore.
        musicStarted = false;
      });
  }

  function showQuotePopup(text) {
    if (!quotePopup || !quoteTextEl) return;
    quoteTextEl.textContent = text;
    quotePopup.setAttribute("aria-hidden", "false");
    quotePopup.classList.add("active");
  }

  function hideQuotePopup() {
    if (!quotePopup) return;
    quotePopup.classList.remove("active");
    quotePopup.setAttribute("aria-hidden", "true");
  }

  // Unlock portal when all cards complete
  function unlockPortal() {
    if (!portalButton) return;
    portalButton.classList.add("visible");
  }

  // Main card click handler
  function handleCardClick(card) {
    if (!card) return;

    // Ignore if already done or already animating
    if (card.classList.contains("completed") || card.classList.contains("animating")) {
      return;
    }

    startMusic();
    card.classList.add("animating");

    const fog = card.querySelector(".fog-veil");
    const inner = card.querySelector(".card-inner");
    const flower = card.querySelector(".flower");
    const quote = card.getAttribute("data-quote") || "";

    if (!inner || !fog || !flower) {
      card.classList.remove("animating");
      return;
    }

    // Step 1: fog lift first (if not already lifted)
    const flipAfterFog = () => {
      // Step 2: flip
      inner.classList.add("flipped");

      const onFlipEnd = (event) => {
        if (event.target !== inner) return;
        inner.removeEventListener("transitionend", onFlipEnd);
        // Step 3: Bloom animation
        flower.classList.add("blooming");

        // Wait for bloom sequence to "finish"
        setTimeout(() => {
          card.classList.add("completed");
          card.classList.remove("animating");

          // Step 4: Quote popup
          if (quote) {
            showQuotePopup(quote);
          }

          completedCount += 1;
          if (completedCount === cards.length) {
            unlockPortal();
          }
        }, BLOOM_DURATION_MS);
      };

      inner.addEventListener("transitionend", onFlipEnd, { once: true });
    };

    // If fog is still there, animate it first
    if (!card.classList.contains("fog-lifted")) {
      fog.classList.add("fog-lifting");

      const onFogEnd = () => {
        fog.removeEventListener("animationend", onFogEnd);
        card.classList.add("fog-lifted");
        // Optionally hide fog element afterward so it doesn't capture events
        fog.style.display = "none";
        flipAfterFog();
      };

      fog.addEventListener("animationend", onFogEnd, { once: true });
    } else {
      flipAfterFog();
    }
  }

  // Attach handlers to each card
  cards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
    card.addEventListener("keypress", (evt) => {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        handleCardClick(card);
      }
    });
  });

  // Quote popup close handlers
  if (quotePopup) {
    quotePopup.addEventListener("click", (event) => {
      // Close on background or card click
      if (event.target === quotePopup || event.target === quoteClose) {
        hideQuotePopup();
      }
    });

    if (quoteClose) {
      quoteClose.addEventListener("click", () => {
        hideQuotePopup();
      });
    }
  }

  // Portal click – start galaxy transition
  if (portalButton && galaxyTransition && galaxySection) {
    portalButton.addEventListener("click", () => {
      if (!portalButton.classList.contains("visible")) return;

      startMusic(); // also counts as user interaction for audio
      startGalaxyTransition();
    });
  }

  function startGalaxyTransition() {
    // Step: fade into black overlay
    galaxyTransition.classList.add("active");

    // Stars scatter
    setTimeout(() => {
      galaxyTransition.classList.add("show-stars");
    }, 900);

    // Shooting star
    setTimeout(() => {
      galaxyTransition.classList.add("shooting");
    }, 1700);

    // Orbit + planet
    setTimeout(() => {
      galaxyTransition.classList.add("show-orbit");
    }, 2500);

    // Heart constellation lines draw
    setTimeout(() => {
      galaxyTransition.classList.add("draw-heart");
    }, 3200);

    // Reveal the galaxy section
    setTimeout(() => {
      galaxySection.classList.add("visible");
      galaxySection.scrollIntoView({ behavior: "smooth" });
      galaxyTransition.classList.add("fade-out");
    }, 4800);

    // Clean up overlay state after fade
    setTimeout(() => {
      galaxyTransition.className = "galaxy-transition";
    }, 6200);
  }
});
