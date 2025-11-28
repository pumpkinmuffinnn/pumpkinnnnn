document.addEventListener("DOMContentLoaded", () => {
  const flowerLayer = document.getElementById("flowerLayer");
  const portalBtn = document.getElementById("portalBtn");
  const gardenScene = document.getElementById("gardenScene");
  const starScene = document.getElementById("starScene");
  const backToGardenBtn = document.getElementById("backToGarden");
  const starField = document.getElementById("starField");
  const starMsgBox = document.getElementById("starMessageBox");
  const starMsgText = document.getElementById("starMessageText");
  const bgm = document.getElementById("bgm");

  let musicStarted = false;

  // 🌸 FLOWER DATA (2 sunflowers, 6 lilies, 2 sakura)
  const flowers = [
    {
      type: "sunflower",
      msg:
        "sejak dulu kamu itu matahari aku—hangat, terang, dan selalu aku cari.",
    },
    {
      type: "sunflower",
      msg:
        "senyuman kamu tuh bikin hari biasa kerasa spesial banget, sumpah beneran.",
    },
    {
      type: "lily",
      msg:
        "cara kamu perhatian sama aku tuh lembut banget, bikin hati aku tenang.",
    },
    {
      type: "lily",
      msg: "aku bisa cerita apa aja ke kamu tanpa takut di-judge, itu mahal banget.",
    },
    {
      type: "lily",
      msg:
        "setiap hari aku nemu alasan baru buat sayang sama kamu, kadang aku sendiri kaget.",
    },
    {
      type: "lily",
      msg:
        "kalau dunia kerasa berat, inget kamu aja udah cukup bikin aku kuat lagi.",
    },
    {
      type: "lily",
      msg: "aku bersyukur banget semesta ketemuin kita lagi setelah 13 tahun lamanya.",
    },
    {
      type: "lily",
      msg:
        "aku nyaman jadi diri sendiri kalau sama kamu, tanpa pura-pura, tanpa takut.",
    },
    {
      type: "sakura",
      msg: "aku jatuh cinta sama kamu pelan-pelan, tapi dalam banget dan gak ada obatnya.",
    },
    {
      type: "sakura",
      msg:
        "kalau ada versi hidup tanpa kamu, aku gamau pilih itu, meskipun ceritanya lebih gampang.",
    },
  ];

  // 🌌 STAR DATA (each with message)
  const stars = [
    {
      x: 18,
      y: 24,
      size: "small",
      msg:
        "kamu tau gak? tiap kali HP aku bunyi dan itu dari kamu, rasanya langsung adem.",
    },
    {
      x: 34,
      y: 38,
      size: "medium",
      msg:
        "di kepala aku, kita itu bukan sekedar kebetulan. kita itu jawaban dari doa yang lama banget.",
    },
    {
      x: 52,
      y: 22,
      size: "normal",
      msg:
        "kalau kamu capek, ingetin diri kamu: ada satu orang di dunia ini yang bangga sama kamu—aku.",
    },
    {
      x: 68,
      y: 32,
      size: "small",
      msg:
        "aku suka banget cara kamu ketawa, sampai kadang aku bercanda cuma biar bisa denger suara itu lagi.",
    },
    {
      x: 42,
      y: 56,
      size: "normal",
      msg:
        "aku mungkin gak selalu tau cara ngomong yang bener, tapi perasaan aku ke kamu itu bener-bener tulus.",
    },
    {
      x: 24,
      y: 60,
      size: "medium",
      msg:
        "kalau takut, kalau ragu, kalau sedih—aku pengen jadi tempat pertama yang kamu cari.",
    },
    {
      x: 70,
      y: 60,
      size: "small",
      msg:
        "buat aku, kamu itu bukan cuma ‘bagian dari hidupku’, kamu itu salah satu alasan hidupku.",
    },
    {
      x: 56,
      y: 74,
      size: "normal",
      msg:
        "kalau suatu hari kamu lupa seberapa berharganya kamu, kamu boleh baca ini ulang-ulang.",
    },
  ];

  // 🌸 Build flowers
  let bloomCount = 0;

  flowers.forEach((flower, index) => {
    const node = document.createElement("button");
    node.className = `flower-node flower--${flower.type}`;
    node.type = "button";
    node.setAttribute("aria-label", flower.type);

    // stem
    const stem = document.createElement("div");
    stem.className = "flower-stem";
    node.appendChild(stem);

    // head
    const head = document.createElement("div");
    head.className = "flower-head";

    if (flower.type === "sunflower") {
      const petalRing = document.createElement("div");
      petalRing.className = "flower-petal-ring";

      const petalCount = 12;
      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.className = "flower-petal";
        const angle = (360 / petalCount) * i;
        petal.style.setProperty("--rot", `${angle}deg`);
        petal.style.animationDelay = `${0.05 * i}s`;
        petalRing.appendChild(petal);
      }

      const center = document.createElement("div");
      center.className = "flower-center";

      head.appendChild(petalRing);
      head.appendChild(center);
    } else if (flower.type === "lily") {
      const petalL = document.createElement("div");
      petalL.className = "lily-petal lily-petal--left";
      const petalR = document.createElement("div");
      petalR.className = "lily-petal lily-petal--right";
      const center = document.createElement("div");
      center.className = "lily-center";

      head.appendChild(petalL);
      head.appendChild(petalR);
      head.appendChild(center);
    } else if (flower.type === "sakura") {
      const petals = [
        "top",
        "left",
        "right",
        "bottom-left",
        "bottom-right",
      ];
      petals.forEach((pos) => {
        const p = document.createElement("div");
        p.className = `sakura-petal sakura-petal--${pos}`;
        head.appendChild(p);
      });
      const center = document.createElement("div");
      center.className = "sakura-center";
      head.appendChild(center);
    }

    node.appendChild(head);

    node.addEventListener("click", () => {
      if (!musicStarted) {
        startMusic();
      }
      if (!node.classList.contains("bloomed")) {
        node.classList.add("bloomed");
        bloomCount++;
        showFlowerMessage(node, flower.msg);
        if (bloomCount === flowers.length) {
          revealPortal();
        }
      } else {
        // already bloomed, just show message again
        showFlowerMessage(node, flower.msg);
      }
    });

    flowerLayer.appendChild(node);
  });

  function showFlowerMessage(node, text) {
    // remove old
    const old = node.querySelector(".flower-message");
    if (old) old.remove();

    const msg = document.createElement("div");
    msg.className = "flower-message";
    msg.textContent = text;
    node.appendChild(msg);

    setTimeout(() => {
      msg.classList.add("flower-message--fade");
    }, 2600);
    setTimeout(() => msg.remove(), 3200);
  }

  function revealPortal() {
    portalBtn.hidden = false;
    requestAnimationFrame(() => {
      portalBtn.classList.add("portal-btn--visible");
    });
  }

  // 🎵 music control
  function startMusic() {
    if (!bgm) return;
    musicStarted = true;
    bgm.volume = 0.3;
    bgm
      .play()
      .catch(() => {
        // ignore autoplay errors
      });
  }

  // ✨ transition to stars
  portalBtn.addEventListener("click", () => {
    startMusic();
    gardenScene.classList.add("scene--hidden");
    starScene.classList.remove("scene--hidden");
    initStars();
  });

  // ↩ back to garden
  backToGardenBtn.addEventListener("click", () => {
    starMsgBox.classList.remove("star-message-box--visible");
    starMsgText.textContent = "";
    starField.innerHTML = "";
    gardenScene.classList.remove("scene--hidden");
    starScene.classList.add("scene--hidden");
  });

  // ⭐ build stars + constellations
  function initStars() {
    starField.innerHTML = "";

    stars.forEach((star, index) => {
      const starNode = document.createElement("button");
      starNode.type = "button";
      starNode.className = "star-node";
      if (star.size === "small") starNode.classList.add("star-node--small");
      if (star.size === "medium") starNode.classList.add("star-node--medium");

      starNode.style.left = star.x + "%";
      starNode.style.top = star.y + "%";
      starNode.style.animationDelay = `${index * 0.25}s`;

      starNode.addEventListener("click", () => {
        starMsgText.textContent = star.msg;
        starMsgBox.classList.add("star-message-box--visible");
      });

      starField.appendChild(starNode);
    });

    // simple constellation lines (manually connect a few stars)
    function addLine(x1, y1, x2, y2) {
      const line = document.createElement("div");
      line.className = "const-line";
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      line.style.left = x1 + "%";
      line.style.top = y1 + "%";
      line.style.width = length + "%";
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      line.style.transform = `rotate(${angle}deg)`;
      starField.appendChild(line);
    }

    // connect a heart-ish shape
    addLine(stars[0].x, stars[0].y, stars[1].x, stars[1].y);
    addLine(stars[1].x, stars[1].y, stars[2].x, stars[2].y);
    addLine(stars[2].x, stars[2].y, stars[3].x, stars[3].y);
    addLine(stars[3].x, stars[3].y, stars[0].x, stars[0].y);

    // bottom cluster
    addLine(stars[4].x, stars[4].y, stars[5].x, stars[5].y);
    addLine(stars[5].x, stars[5].y, stars[6].x, stars[6].y);
    addLine(stars[6].x, stars[6].y, stars[7].x, stars[7].y);
  }
});
