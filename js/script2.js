const section2 = document.querySelector(".section-02");
const msgText = section2.querySelector(".msg-elem");

const canvas2 = document.getElementById("head-bob-turn");
const context2 = canvas2.getContext("2d");
canvas2.width = 1458;
canvas2.height = 820;

const images2 = [];
const headturn = {
  frame: 0,
};
const frameCount2 = 131;

// Populating images
const currentFrame2 = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/${(
    index + 1
  )
    .toString()
    .padStart(4, "0")}.jpg`;

for (let i = 0; i < frameCount2; i++) {
  const img = new Image();
  img.src = currentFrame2(i);
  images2.push(img);
}

// GSAP Timeline #2
let tl2 = gsap.timeline();
tl2
  .add("start0")

  /* Main Text Animation */
  .to(msgText, { delay: 11, duration: 3.5, opacity: 1, y: -50 }, "start0")
  .to(msgText, { duration: 3.5, opacity: 0, y: -100 })

  /* BG 'Image Change' Animation */
  .to(
    headturn,
    {
      duration: 19,
      frame: frameCount2 - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render2,
    },
    "start0"
  );

// ScrollMagic Scene #2
let scene2 = new ScrollMagic.Scene({
  triggerElement: ".section-02",
  duration: "4000",
  triggerHook: 0,
  //   offset: "100",
})
  .setTween(tl2)
  .setPin(".section-02")
  .addTo(controller);

// Initial image loading
images2[0].onload = render2;

// Rendering image on canvas
function render2() {
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  context2.drawImage(images2[headturn.frame], 0, 0);
}
