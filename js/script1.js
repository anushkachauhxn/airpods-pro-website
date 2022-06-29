/* MAIN ANIMATION */
const section1 = document.querySelector(".section-01");
const mainText = section1.querySelector(".main-elem");
const msgText1 = section1.querySelector(".msg-elem-01");
const msgText2 = section1.querySelector(".msg-elem-02");
const msgText3 = section1.querySelector(".msg-elem-03");
const msgText4 = section1.querySelector(".msg-elem-04");

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
canvas.width = 1158;
canvas.height = 770;

const images = [];
const airpods = {
  frame: 0,
};
const frameCount = 147;

// Populating images
const currentFrame = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
    index + 1
  )
    .toString()
    .padStart(4, "0")}.jpg`;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// GSAP Timeline #0 - Initial Loading Animation
// (Not attached to scrolling)
let tl0 = gsap.timeline();
tl0
  .add("start0")
  .fromTo(canvas, { opacity: 0 }, { duration: 2, opacity: 1 }, "start0")
  .fromTo(
    mainText,
    { opacity: 0 },
    { duration: 1.5, delay: 0.75, opacity: 1 },
    "start0"
  );

// GSAP Timeline #1
let tl1 = gsap.timeline();
tl1
  .add("start0")

  /* Main Text Animation */
  .to(mainText, { duration: 5, y: -500 }, "start0")

  /* BG 'Image Change' Animation */
  .to(
    airpods,
    {
      duration: 8,
      frame: 138,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    },
    "start0"
  )

  /* Message Text Animation - 1, 2, 3, 4 */
  .add("start1")
  .to(msgText1, { duration: 3.5, opacity: 1, y: -50 }, "start1")
  .to(msgText1, { duration: 3.5, opacity: 0, y: -100 })

  .add("start2")
  .to(msgText2, { duration: 3.5, opacity: 1, y: -50 }, "start2")
  .to(msgText2, { duration: 3.5, opacity: 0, y: -100 })

  .add("start3")
  .to(msgText3, { duration: 3.5, opacity: 1, y: -50 }, "start3")
  .to(msgText3, { duration: 3.5, opacity: 0, y: -100 })

  .add("start4")
  .to(msgText4, { duration: 3.5, opacity: 1, y: -50 }, "start4")
  .to(msgText4, { duration: 3.5, opacity: 0, y: -100 })

  /* Ending the scene - black screen in the end */
  .to(airpods, {
    duration: 1,
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    onUpdate: render,
  })

  /* BG 'Image Scale' Animation */
  .to(canvas, { duration: 36, scale: 0.5, ease: Power1.easeIn }, "start0");

// ScrollMagic Scene #1
let scene1 = new ScrollMagic.Scene({
  triggerElement: ".section-01",
  duration: "4000",
  triggerHook: 0,
  //   offset: "100",
})
  .setTween(tl1)
  .setPin(".section-01")
  .addTo(controller);

// Initial image loading
images[0].onload = render;

// Rendering image on canvas
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0);
}
