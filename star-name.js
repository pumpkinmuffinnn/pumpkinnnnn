window.onload = () => {

  const thankWrapper = document.getElementById("thank-wrapper");
  const thankBtn = document.getElementById("thank-btn");

  const sparkleSound = document.getElementById("sparkle-sound");

  const letter = document.getElementById("letter-popup");

  const finalCon = document.getElementById("final-container");
  const finalSVG = document.querySelectorAll("#final-svg path, #final-svg circle");

  const endButtons = document.getElementById("end-buttons");

  setTimeout(() => {
    thankWrapper.classList.remove("hidden");
    thankBtn.classList.add("show");
  }, 4000);

  thankBtn.addEventListener("click", () => {
    thankWrapper.classList.add("hidden");

    setTimeout(() => {
      letter.classList.remove("hidden");
    }, 400);
  });

  letter.addEventListener("click", () => {

    letter.classList.add("hidden");

    setTimeout(() => {
      finalCon.classList.remove("hidden");

      let delay = 0;
      finalSVG.forEach(p => {
        setTimeout(() => sparkleSound.play().catch(()=>{}), delay * 1000);
        p.style.animation = `draw 2.4s ${delay}s ease forwards`;
        delay += 0.35;
      });

    }, 300);
  });

finalSVG[finalSVG.length - 1].addEventListener("animationend", () => {

  const finalFade = document.getElementById("final-fade");

  setTimeout(() => {
    finalFade.classList.remove("hidden");
    finalFade.classList.add("show");
  }, 800);

  setTimeout(() => {
    finalFade.classList.remove("show");  
    endButtons.classList.add("visible");
  }, 3000);

});

const style = document.createElement("style");
style.innerHTML = `
@keyframes draw {
  to { stroke-dashoffset: 0; }
}`;
document.head.appendChild(style);

}
