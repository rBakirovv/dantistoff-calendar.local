window.addEventListener("DOMContentLoaded", function () {
  const popupQuiz = document.querySelector(".popup-quiz");
  const quiz = document.querySelector(".popup-quiz__container");
  const planButton = document.querySelector(".plan__orange-button");
  const sexDropdown = quiz.querySelector("#quiz-sex");
  const sexDropdownItem = quiz.querySelectorAll(".quiz__input-dropdown-item");
  const quizOptions = quiz.querySelectorAll(".quiz__option");

  const stepFirst = quiz.querySelector("#quiz-step-1");
  const stepSecond = quiz.querySelector("#quiz-step-2");
  const stepLast = quiz.querySelector("#quiz-step-3");

  function openQuiz() {
    popupQuiz.classList.add("popup_opened");
  }

  function closeQuiz() {
    popupQuiz.classList.remove("popup_opened");
  }

  planButton.addEventListener("click", openQuiz)

  popupQuiz.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeQuiz();
    }
    if (evt.target.classList.contains("popup-close")) {
      closeQuiz();
    }
  })

  sexDropdown.addEventListener("click", () => {
    sexDropdown.parentNode.querySelector(".quiz__input-dropdown").classList.toggle("quiz__input-dropdown_active");
  })

  sexDropdownItem.forEach((item) => {
    item.addEventListener("click", () => {
      sexDropdown.parentNode.querySelector(".quiz__input-dropdown").classList.remove("quiz__input-dropdown_active");
      sexDropdown.value = item.textContent;
    })
  })

  quizOptions.forEach((quizOption) => {
    quizOption.addEventListener("click", () => {
      quizOption.classList.toggle("quiz__option_active");
    })
  })

  stepFirst.addEventListener("submit", (e) => {
    e.preventDefault();
    stepFirst.classList.remove("popup-quiz__step_active");
    stepSecond.classList.add("popup-quiz__step_active");
  })

  stepSecond.addEventListener("submit", (e) => {
    e.preventDefault();

    if (stepSecond.querySelectorAll(".quiz__option_active").length > 0) {
      stepSecond.classList.remove("popup-quiz__step_active");
      stepLast.classList.add("popup-quiz__step_active");
    }
  })

  stepSecond.querySelector(".quiz__back-button").addEventListener("click", () => {
    stepSecond.classList.remove("popup-quiz__step_active");
    stepFirst.classList.add("popup-quiz__step_active");
  })

  stepLast.addEventListener("submit", (e) => {
    e.preventDefault();
    closeQuiz();
    stepLast.classList.remove("popup-quiz__step_active");
  })
})