window.addEventListener("DOMContentLoaded", function () {
  const html = document.querySelector("html");
  const burgerButton = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeMenu = document.querySelector(".close-menu");

  burgerButton.addEventListener("click", () => {
    html.style.overflow = "hidden";
    mobileNav.classList.toggle("active");
  })

  closeMenu.addEventListener("click", () => {
    html.style.overflow = "visible";
    mobileNav.classList.toggle("active");
  })
})