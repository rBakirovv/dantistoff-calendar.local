//active
window.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeMenu = document.querySelector(".close-menu");

  burgerButton.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  })
  
  closeMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  })
})