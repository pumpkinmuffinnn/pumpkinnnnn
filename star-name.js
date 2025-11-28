window.onload = () => {

  const thankWrapper = document.getElementById("thank-wrapper");
  const thankBtn = document.getElementById("thank-btn");

  const sparkleSound = document.getElementById("sparkle-sound");

  const letter = document.getElementById("letter-popup");

  const finalCon = document.getElementById("final-container");
  const finalSVG = document.querySelectorAll("#final-svg path, #final-svg circle");

  const endButtons = document.getElementById("end-buttons");


  /* STEP 1 — Show thank button */
  setTimeout(() => {
    thankWrapper.classList.remove("hidden");
    thankBtn.classList.add("show");
  }, 4000);


  /* STEP 2 — After clicking thank you → show letter */
  thankBtn.addEventListener("click", () => {
    thankWrapper.classList.add("hidden");

    setTimeout(() => {
      letter.classList.remove("hidden");
    }, 400);
  });


  /* STEP 3 — Tap letter → final constellation */
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


  /* STEP 4 — After final name finishes → show end buttons */
finalSVG[finalSVG.length - 1].addEventListener("animationend", () => {

  const finalFade = document.getElementById("final-fade");

  // Step 1 — fade to black
  setTimeout(() => {
    finalFade.classList.remove("hidden");
    finalFade.classList.add("show");
  }, 800);

  // Step 2 — fade back in + show end buttons
  setTimeout(() => {
    finalFade.classList.remove("show");  // fade back out
    endButtons.classList.add("visible");
  }, 3000);

});



/* DRAW ANIMATION KEYFRAME */
const style = document.createElement("style");
style.innerHTML = `
@keyframes draw {
  to { stroke-dashoffset: 0; }
}`;
document.head.appendChild(style);

}
