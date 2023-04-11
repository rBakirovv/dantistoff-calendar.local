window.addEventListener("DOMContentLoaded", function () {
  const swiperDoctors = new Swiper('.swiper-video-reviews', {
    loop: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    navigation: {
      nextEl: ".video-reviews-button-next",
      prevEl: ".video-reviews-button-prev",
    },
    pagination: {
      el: ".video-reviews-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      500: {
        centeredSlides: true,
        spaceBetween: 15,
      },
    },
  });
})