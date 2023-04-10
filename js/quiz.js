window.addEventListener("DOMContentLoaded", function () {
  const popupQuiz = document.querySelector(".popup-quiz");
  const quiz = document.querySelector(".quiz__container");
  const planButton = document.querySelector(".plan__orange-button");
  const sexDropdown = quiz.querySelector("#quiz-sex");
  const sexDropdownItem = quiz.querySelectorAll(".quiz__input-dropdown-item");
  const quizOptions = quiz.querySelectorAll(".quiz__option");

  const stepFirst = quiz.querySelector("#quiz-step-1");
  const stepSecond = quiz.querySelector("#quiz-step-2");
  const stepLast = quiz.querySelector("#quiz-step-3");
  const stepSuccess = quiz.querySelector("#quiz-step-4");
  const stepFail = quiz.querySelector("#quiz-step-5");

  const nameInput = quiz.querySelector("#quiz-name");
  const birthdayInput = quiz.querySelector("#quiz-birthday");
  const telInput = quiz.querySelector("#quiz-tel");

  const nameRegex = /^[А-Яа-яa-zA-Z- ]{1,30}$/;
  const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const regexPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  let nameInputValue;
  let birthdayInputValue;
  let sexDropdownValue;
  let secondStepArray = [];

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

      sexDropdown.classList.remove("input-invalid");
      sexDropdown.classList.add("input-valid");
    })
  })

  quizOptions.forEach((quizOption) => {
    quizOption.addEventListener("click", () => {
      quizOption.classList.toggle("quiz__option_active");
    })
  })

  stepFirst.addEventListener("submit", (e) => {
    e.preventDefault();
    if (nameRegex.test(nameInput.value) && dateRegex.test(birthdayInput.value)) {
      if (sexDropdown.value !== "") {
        nameInputValue = nameInput.value;
        birthdayInputValue = birthdayInput.value;
        sexDropdownValue = sexDropdown.value;

        stepFirst.classList.remove("quiz__step_active");
        stepSecond.classList.add("quiz__step_active");
      } else {
        sexDropdown.classList.remove("input-valid");
        sexDropdown.classList.add("input-invalid");
      }
    }
  })

  let optionsArray = [];

  stepSecond.addEventListener("submit", (e) => {
    e.preventDefault();

    secondStepArray = document.querySelectorAll(".quiz__option_active");

    stepSecond.classList.remove("quiz__step_active");
    stepLast.classList.add("quiz__step_active");

    /*
    if (stepSecond.querySelectorAll(".quiz__option_active").length > 0) {}
    */
  })

  stepSecond.querySelector(".quiz__back-button").addEventListener("click", () => {
    stepSecond.classList.remove("quiz__step_active");
    stepFirst.classList.add("quiz__step_active");
  })

  stepLast.addEventListener("submit", (e) => {
    e.preventDefault();

    secondStepArray.forEach((item) => {
      optionsArray.push(item.innerText);
    })

    if (telInput.classList.contains("input-valid")) {
      const url = 'https://dantistoff.ru/webhook/konkurs_allon4/';

      const data = new URLSearchParams(new FormData());

      data.append('url', window.location.href);
      data.append('name', nameInputValue);
      data.append('birthday', birthdayInputValue);
      data.append('sex', sexDropdownValue);
      data.append('services', optionsArray.join(', '));
      data.append('phone', telInput.value);

      setTimeout(() => {
        const result = fetch(url, {
          method: 'post',
          body: data,
        }).then(() => {
          stepLast.classList.remove("quiz__step_active");
          stepSuccess.classList.add("quiz__step_active");
        }).catch(() => {
          stepLast.classList.remove("quiz__step_active");
          stepFail.classList.add("quiz__step_active");
        })
      }, 100)

      return
    }

    if (!telInput.classList.contains("input-valid")) {
      telInput.classList.remove("input-valid");
      telInput.classList.add("input-invalid");
    }

    if (telInput.classList.contains("input-valid")) {
      telInput.classList.remove("input-invalid");
      telInput.classList.add("input-valid");
    }
  })

  stepSuccess.addEventListener("submit", (e) => {
    e.preventDefault();

    stepSuccess.classList.remove("quiz__step_active");
    stepFirst.classList.add("quiz__step_active");

    closeQuiz();
  })

  stepFail.addEventListener("submit", (e) => {
    e.preventDefault();

    stepFail.classList.remove("quiz__step_active");
    stepFirst.classList.add("quiz__step_active");

    closeQuiz();
  })

  nameInput.addEventListener("input", (e) => {
    if (nameRegex.test(e.target.value)) {
      nameInput.classList.remove("input-invalid");
      nameInput.classList.add("input-valid");
    } else {
      if (nameInput.classList.contains("input-valid")) {
        nameInput.classList.remove("input-valid");
        nameInput.classList.add("input-invalid");
      }
    }
  })

  birthdayInput.addEventListener("input", (e) => {
    if (dateRegex.test(e.target.value)) {
      birthdayInput.classList.remove("input-invalid");
      birthdayInput.classList.add("input-valid");
    } else {
      if (birthdayInput.classList.contains("input-valid")) {
        birthdayInput.classList.remove("input-valid");
        birthdayInput.classList.add("input-invalid");
      }
    }
  })

  // phone 

  var getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  }

  var onPhonePaste = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      var pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  var onPhoneInput = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;

    if (regexPhone.test(formattedInputValue)) {
      telInput.classList.remove("input-invalid");
      telInput.classList.add("input-valid");
    } else {
      if (telInput.classList.contains("input-valid")) {
        telInput.classList.remove("input-valid");
        telInput.classList.add("input-invalid");
      }
    }
  }

  var onPhoneKeyDown = function (e) {
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }

  telInput.addEventListener('keydown', onPhoneKeyDown);
  telInput.addEventListener('input', onPhoneInput, false);
  telInput.addEventListener('paste', onPhonePaste, false);
})