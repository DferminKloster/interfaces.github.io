const carrousels = document.querySelectorAll('.carrousel-container');

carrousels.forEach((carrousel) => {
  const prev = carrousel.querySelector(".prev");
  const next = carrousel.querySelector(".next");
  const track = carrousel.querySelector(".track");

  let index = 0;
  let width = carrousel.offsetWidth;
  window.addEventListener("resize", function () {
    width = carrousel.offsetWidth;
  });
  next.addEventListener("click", function (e) {
    e.preventDefault();
    index = index + 1;
    prev.classList.add("show");
    track.style.transform = "translateX("  + index * -width + /*+ -100 + */ "px)";
    if (track.offsetWidth - index * width < index * width) {
      next.classList.add("hide");
    }
  });
  prev.addEventListener("click", function () {
    index = index - 1;
    next.classList.remove("hide");
    if (index === 0) {
      prev.classList.remove("show");
    }
    track.style.transform = "translateX(" + index * -width + "px)";
  });
});
