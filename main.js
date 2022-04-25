const container = document.querySelector(".slider-container");
const prev = container.querySelector(".btn-prev");
const next = container.querySelector(".btn-next");
const slides = container.getElementsByClassName("slide");
const play = container.querySelector(".play");
const pause = container.querySelector(".pause");
const indicators = container.querySelectorAll(".indicator");
const indicatorsContainer = container.querySelector(".indicators");
let swipeStartX = null;
let swipeEndX = null;
let intervalID = null;
let isPlaying = true;
let cntSld = 0;
// TRANSFORM TRANSLATE VARIANT
// btnNext.addEventListener("click", () => {
//   index += 100;
//   if (index / 100 > slide.length - 1) {
//     index = 0;
//   }
//   container.style.transform = `translate(-${index}%)`;
// });

// btnPrev.addEventListener("click", () => {
//   if (index === 0) {
//     index = slide.length * 100;
//   }
//   index -= 100;
//   container.style.transform = `translate(-${Math.abs(index)}%)`;
// });

// function activeSlide(n) {
//   for(let slide of slides) {
//     slide.classList.remove('active');
//   }
//   slides[n].classList.add('active');
// }

// btnNext.addEventListener('click', (function () {
//   let index = 0
//   return function () {
//     if(index == slides.length - 1){
//       index = 0;
//       activeSlide(index)
//     } else {
//       index++;
//       activeSlide(index)
//     }
//   }
// })());

// btnPrev.addEventListener('click', (function () {
//   index = 0
//   return function () {
//     if(index === 0) {
//       index = slides.length - 1
//       activeSlide(index)
//     } else {
//       index--;
//       activeSlide(index)
//     }
//   }
// })()
// );

pause.addEventListener("click", stop);
play.addEventListener("click", stop);
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);
container.addEventListener("touchstart", swipeStart);
container.addEventListener("touchend", swipeEnd);
indicatorsContainer.addEventListener("click", getInd);

const start = () => toNextSlide();

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}
function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  if(swipeStartX - swipeEndX > 100) {
    nextSlide()
  } 
  if(swipeStartX - swipeEndX < -100) {
    prevSlide()
  }

}

function showSlide() {
  for (let slide of slides) {
    slide.classList.remove("active");
  }
  slides[cntSld].classList.add("active");
  activeInd();
}

function toNextSlide() {
  cntSld++;
  if (cntSld > slides.length - 1) {
    cntSld = 0;
  }
  showSlide();
}
function stop() {
  if (isPlaying) {
    clearInterval(intervalID);
    pause.style.display = "none";
    play.style.display = "block";
    isPlaying = false;
  } else {
    play.style.display = "none";
    pause.style.display = "block";
    intervalID = setInterval(start, 1500);
    isPlaying = true;
  }
}

function nextSlide() {
  if (isPlaying) {
    stop();
  }
  toNextSlide();
}
function prevSlide() {
  if (isPlaying) {
    stop();
  }
  cntSld--;
  if (cntSld < 0) {
    cntSld = slides.length - 1;
  }
  showSlide();
}

function activeInd() {
  for (let indicator of indicators) indicator.classList.remove("activeInd");
  indicators[cntSld].classList.add("activeInd");
}

function getInd(e) {
  let target = e.target;
  let indexInd = target.dataset.doTo;
  if (target.classList.contains("indicator")) {
    cntSld = indexInd;
    if (isPlaying) {
      stop();
    }
    showSlide();
  }
}
intervalID = setInterval(start, 1500);
