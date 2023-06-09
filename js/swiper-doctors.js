window.addEventListener("DOMContentLoaded", function () {
  const swiperDoctors = new Swiper('.swiper-doctors', {
    autoHeight: true, //enable auto height
    loop: true,
    slideToClickedSlide: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    direction: "horizontal",
    navigation: {
      nextEl: ".doctors-button-next",
      prevEl: ".doctors-button-prev",
    },
    pagination: {
      el: ".doctors-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      500: {
        autoHeight: true, //enable auto height
        direction: "horizontal",
        spaceBetween: 24,
      },
    },
  });
})