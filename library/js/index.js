window.addEventListener("DOMContentLoaded", () => {

  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav-navigation");
  const body = document.body;
  // let accountBtn = document.querySelector('.account__btn')
  const navProfile = document.querySelector(".header__profile__list");
  let imgProfileBtn = document.querySelector(".account__btn");

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    burger.classList.toggle("active");
    if (burger.classList.contains("active")) {
      disableScroll();
    } else {
      enableScroll();
    }
    nav.classList.toggle("active");
    closeAuthMenu();
  });

  body.addEventListener("click", (event) => {
    if (!event.target.closest(".header__nav-navigation")) {
      closeNav();
    }
  });

  document.querySelectorAll(".navigation__link").forEach((item) => {
    item.addEventListener("click", () => {
      closeNav();
    });
  });

  function closeNav() {
    burger.classList.remove("active");
    nav.classList.remove("active");
    enableScroll();
  }

  function disableScroll() {
    body.classList.add("froze-scroll");
  }

  function enableScroll() {
    body.classList.remove("froze-scroll");
  }

  function closeAuthMenu() {
    navProfile.classList.remove("header__profile__list-active");
  }

  const swiper = new Swiper(".swiper", {
    spaceBetween: 26,
    keyboard: true,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: true,
      disableOnInteraction: false,
    },
    speed: 700,
    breakpoints: {
      260: {
        slidesPerView: 1,
      },
      769: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      clickable: true,
    },
  });

  const radioButtons = document.querySelectorAll(".custom__input");
  const contentBlocks = document.querySelectorAll(".favorite__books_half");
  const blocksPerPage = 4;

  function updateBlocksVisibility(selectedIndex) {
    contentBlocks.forEach((block, index) => {
      if (
        index >= selectedIndex * blocksPerPage &&
        index < (selectedIndex + 1) * blocksPerPage
      ) {
        block.classList.add("fade-in", "fade");
      } else {
        block.classList.remove("fade-in", "fade");
      }
    });
  }

  radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener("change", () => {
      updateBlocksVisibility(index);
    });
  });

  // При загрузке страницы показываем содержимое для первой вкладки
  updateBlocksVisibility(0);

  imgProfileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.currentTarget === imgProfileBtn) {
      navProfile.classList.toggle("header__profile__list-active");
    }
    burger.classList.remove("active");
    nav.classList.remove("active");
  });

  body.addEventListener("click", (event) => {
    if (!event.target.closest(".header__profile__list")) {
      closeAuthMenu();
    }
  });

  const popupLinkLogin = document.querySelectorAll(".popup__link-login");
  const popupLinkRegister = document.querySelectorAll(".popup__link-register");
  const popupWindowLogin = document.querySelector(".popup__login");
  const popupWindowRegister = document.querySelector(".popup__register");
  // const lockPadding = document.querySelectorAll('.lock-padding')

  let unlock = true;

  if (popupLinkLogin.length > 0) {
    for (let i = 0; i < popupLinkLogin.length; i++) {
      const elements = popupLinkLogin[i];
      elements.addEventListener("click", (e) => {
        popupOpenLogin(popupWindowLogin);
        popupClose(popupWindowRegister);
        closeAuthMenu();
        bodyLock();
        e.preventDefault();
      });
    }
  }

  if (popupLinkRegister.length > 0) {
    for (let i = 0; i < popupLinkRegister.length; i++) {
      const elements = popupLinkRegister[i];
      elements.addEventListener("click", (e) => {
        popupOpenRegister(popupWindowRegister);
        popupClose(popupWindowLogin);
        bodyLock();
        closeAuthMenu();
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll(".popup__close");
  if (popupCloseIcon.length > 0) {
    popupCloseIcon.forEach((el) => {
      el.addEventListener("click", (e) => {
        popupClose(el.closest(".modal"));
        e.preventDefault();
      });
    });
  }

  function popupOpenLogin(currentPopupLogin) {
    if (currentPopupLogin && unlock) {
      const popupActive = document.querySelector(".popup__login.open");
      currentPopupLogin.classList.add("open");
      currentPopupLogin.addEventListener("click", (e) => {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".modal"));
        }
      });
    }
  }

  function popupOpenRegister(currentPopupRegister) {
    if (currentPopupRegister && unlock) {
      const popupActive = document.querySelector(".popup__register.open");
      currentPopupRegister.classList.add("open");
      currentPopupRegister.addEventListener("click", (e) => {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".modal"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    body.classList.add("lock");
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, 600);
  }

  function bodyUnlock() {
    body.classList.remove("lock");
  }

  if (
    (localStorage.getItem("userRegistered") !== "true" &&
      localStorage.getItem("userAuthorized") !== "true") ||
    (localStorage.getItem("userRegistered") === "true" &&
      localStorage.getItem("userAuthorized") !== "true")
  ) {
    imgProfileBtn.innerHTML = `
        <svg  class="header__profile__img account__btn" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM18.6667 7.77778C18.6667 10.3551 16.5774 12.4444 14.0001 12.4444C11.4227 12.4444 9.33339 10.3551 9.33339 7.77778C9.33339 5.20045 11.4227 3.11111 14.0001 3.11111C16.5774 3.11111 18.6667 5.20045 18.6667 7.77778ZM19.4998 16.2781C20.9584 17.7367 21.7778 19.715 21.7778 21.7778H14L6.22225 21.7778C6.22225 19.715 7.0417 17.7367 8.50031 16.2781C9.95893 14.8194 11.9372 14 14 14C16.0628 14 18.0411 14.8194 19.4998 16.2781Z" fill="white"/>
        </svg>
      `;
      const buyBtn = document.querySelectorAll('.description__button')

      buyBtn.forEach((el) =>{
        el.classList.add('popup__link-login')
      })

      const cardForm = document.querySelector('.card__searching__bg')

      const cardName = document.querySelector('.input-reader__name')
      const cardNumber =  document.querySelector('.input-card__number')

      const nameError = document.querySelector('.card__name-error')
      const numberError = document.querySelector('.card__number-error')

      const checkCardBtn = document.querySelector('.user__info__button')

      checkCardBtn.addEventListener(('click'), (e) =>{

          e.stopPropagation()

        let cardNameValue = cardName.value.replace(/(^|\s)\S/g, function(a) {
          return a.toUpperCase()
        })
        
        let cardNumberValue = cardNumber.value.toUpperCase()

        let falseValidation = false

        nameError.textContent = '';
        if (cardNameValue === '') {
          nameError.textContent = 'Please, fill the area'
          falseValidation = true
        } else if (cardNameValue !== `${localStorage.getItem('UserName')} ${localStorage.getItem('UserLastName')}`) {
         nameError.textContent = 'Please enter a valid first name and last name'
          falseValidation = true
        } else{
          console.log('u r done')
        }

        numberError.textContent = ''
        if (cardNumberValue === '') {
          numberError.textContent = 'Please, fill the area'
          falseValidation = true
        } else if (cardNumberValue !== `${localStorage.getItem('CardNumber')}`){
          numberError.textContent = 'Please, enter a valid card number'
          falseValidation = true
        } else{
          console.log('u r done')
        }

        if (falseValidation === true) {
          return
        }

        cardNumber.value = '';
        cardName.value = '';

        const userCardInfo = document.querySelector('.card__searching__bg')

        userCardInfo.innerHTML = `
        <div class="user__info">
            <p class="user__info__title">
                Brooklyn Public Library
            </p>
            <div class="user__info-form">
                <span class="user__info-input input-reader__name input__margin"> ${localStorage.getItem(
                  "UserName"
                )} ${localStorage.getItem("UserLastName")}</span>
                <span class="user__info-input input-card__number input__margin"> ${localStorage.getItem(
                  "CardNumber"
                )} </span>
            </div>
        </div>
        <div class="user__info__click">
            <ul class="user__info-list">
                <li class="user__info-item">
                    <span>Visits</span>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C13.2614 10 15.5 7.76142 15.5 5C15.5 2.23858 13.2614 0 10.5 0C7.73858 0 5.5 2.23858 5.5 5C5.5 7.76142 7.73858 10 10.5 10ZM17.5711 13.9289C19.4464 15.8043 20.5 18.3478 20.5 21H10.5L0.5 21C0.5 18.3478 1.55357 15.8043 3.42893 13.9289C5.3043 12.0536 7.84784 11 10.5 11C13.1522 11 15.6957 12.0536 17.5711 13.9289Z" fill="#BB945F"/>
                    </svg>
                    <span>1</span>
                </li>
                <li class="user__info-item">
                    <span>Bonuses</span>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0L12.2249 3.31001L15.8779 2.00532L15.8249 6.05634L19.5106 7.25532L17.2 10.5L19.5106 13.7447L15.8249 14.9437L15.8779 18.9947L12.2249 17.69L10 21L7.77508 17.69L4.12215 18.9947L4.17508 14.9437L0.489435 13.7447L2.8 10.5L0.489435 7.25532L4.17508 6.05634L4.12215 2.00532L7.77508 3.31001L10 0Z" fill="#BB945F"/>
                    </svg>
                    <span>1240</span>
                </li>
                <li class="user__info-item">
                    <span>Books</span>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="21" fill="#BB945F"/>
                        <rect x="2" width="1" height="19" fill="#826844"/>
                        <rect x="1" width="1" height="21" fill="white"/>
                    </svg>
                    <span>0</span>
                </li>
            </ul>                        
        </div>`;

        setTimeout(() => {

          userCardInfo.innerHTML = `<div class="user__info">
          <p class="user__info__title">
              Brooklyn Public Library
          </p>
          <form class="user__info-form">
              <label class="user__info-label">
                  <input class="user__info-input input-reader__name" placeholder="Reader's name" type="text" required pattern="^[a-zA-Z]+$">
                  <span class="card__name-error"></span>
              </label>
              <label  class="user__info-label">
                  <input class="user__info-input input-card__number" placeholder="Card number" type="text" required pattern="[A-Z]{1}[0-9]+$">
                  <span class="card__number-error"></span>
              </label>
          </form>
      </div>
      <div class="user__info__click">
          <button class="user__info__button">Check the card</button>
      </div>`
      location.reload()
        }, 10000)




      })

    /* Don't  forget to back nav to first state */
  }

  if (
    localStorage.getItem("userRegistered") === "true" &&
    localStorage.getItem("userAuthorized") === "true"
  ) {
    //получить инициалы юзера
    let profileNameInitial = localStorage.getItem("UserName");
    let profileSurNameInitial = localStorage.getItem("UserLastName");
    let initials = `${profileNameInitial[0]}${profileSurNameInitial[0]}`;
    const buyBtn = document.querySelectorAll('.description__button')

    buyBtn.forEach((el) =>{
      el.classList.remove('popup__link-login')
    })
    /* replace content here */

    //если юзернейм есть в БД, то вместо свг иконки в кнопке юзера вставить его инициалы
    if (localStorage.getItem("UserName")) {
      //заменить содержимый код кнопки юзера на его инициалы
      imgProfileBtn.innerHTML = initials;
      imgProfileBtn.setAttribute(
        "title",
        `${localStorage.getItem("UserName")} ${localStorage.getItem(
          "UserLastName"
        )}`
      );
      imgProfileBtn.classList.add("account__btn-after-register");

      //заменить содержимый код дроп-листа на дроп-лист после авторизации
      navProfile.classList.add("nav__profile-after-login");
      navProfile.innerHTML = `
            <b class="header__profile__list-text">${localStorage.getItem(
              "CardNumber"
            )}</b>
            <li class="header__profile__list-item"> <button class="header__profile__list-login my__profile-popup">My profile</button></li>
            <li class="header__profile__list-item"> <button class="header__profile__list-register log__out">Log out</button></li>
            `;

      document.querySelector(
        ".card__number"
      ).innerHTML = `${localStorage.getItem("CardNumber")}`;
      document.querySelector(".aside__initials").innerHTML = initials;
      document.querySelector(
        ".aside__name-sur"
      ).innerHTML = `${localStorage.getItem("UserName")} ${localStorage.getItem(
        "UserLastName"
      )}`;

      document.querySelector(".card__getting").innerHTML = `
            <p class="card__getting__title">
                Visit your profile
            </p>
            <p class="card__getting__text">
            With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.
            </p>
            <div class="card__getting__buttons">
                <button class="card__getting__button__1  popup__link-register my__profile-popup">Profile</button>
            </div>
            <button class="local__clear">`;
      document.querySelector(".card__searching__bg").innerHTML = `
            <div class="user__info">
                <p class="user__info__title">
                    Brooklyn Public Library
                </p>
                <div class="user__info-form">
                    <span class="user__info-input input-reader__name"> ${localStorage.getItem(
                      "UserName"
                    )} ${localStorage.getItem("UserLastName")}</span>
                    <span class="user__info-input input-card__number"> ${localStorage.getItem(
                      "CardNumber"
                    )} </span>
                </div>
            </div>
            <div class="user__info__click">
                <ul class="user__info-list">
                    <li class="user__info-item">
                        <span>Visits</span>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C13.2614 10 15.5 7.76142 15.5 5C15.5 2.23858 13.2614 0 10.5 0C7.73858 0 5.5 2.23858 5.5 5C5.5 7.76142 7.73858 10 10.5 10ZM17.5711 13.9289C19.4464 15.8043 20.5 18.3478 20.5 21H10.5L0.5 21C0.5 18.3478 1.55357 15.8043 3.42893 13.9289C5.3043 12.0536 7.84784 11 10.5 11C13.1522 11 15.6957 12.0536 17.5711 13.9289Z" fill="#BB945F"/>
                        </svg>
                        <span>1</span>
                    </li>
                    <li class="user__info-item">
                        <span>Bonuses</span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0L12.2249 3.31001L15.8779 2.00532L15.8249 6.05634L19.5106 7.25532L17.2 10.5L19.5106 13.7447L15.8249 14.9437L15.8779 18.9947L12.2249 17.69L10 21L7.77508 17.69L4.12215 18.9947L4.17508 14.9437L0.489435 13.7447L2.8 10.5L0.489435 7.25532L4.17508 6.05634L4.12215 2.00532L7.77508 3.31001L10 0Z" fill="#BB945F"/>
                        </svg>
                        <span>1240</span>
                    </li>
                    <li class="user__info-item">
                        <span>Books</span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="20" height="21" fill="#BB945F"/>
                            <rect x="2" width="1" height="19" fill="#826844"/>
                            <rect x="1" width="1" height="21" fill="white"/>
                        </svg>
                        <span>0</span>
                    </li>
                </ul>                        
            </div>`;

      const popupWindowProfile = document.querySelector(".popup__profile");
      const popupLinkProfile = document.querySelectorAll(".my__profile-popup");
      console.log(popupLinkProfile[0]);

      let unlock = true;

      if (popupLinkProfile.length > 0) {
        for (let i = 0; i < popupLinkProfile.length; i++) {
          const elements = popupLinkProfile[i];
          elements.addEventListener("click", (e) => {
            popupOpenProfile(popupWindowProfile);
            closeAuthMenu();
            bodyLock();
            e.preventDefault();
          });
        }
      }

      function popupOpenProfile(currentPopupRegister) {
        if (currentPopupRegister && unlock) {
          const popupActive = document.querySelector(".popup__profile.open");
          currentPopupRegister.classList.add("open");
          currentPopupRegister.addEventListener("click", (e) => {
            if (!e.target.closest(".content")) {
              popupClose(e.target.closest(".modal"));
            }
          });
        }
      }

      const popupCloseIcon = document.querySelectorAll(".popup__close");
      if (popupCloseIcon.length > 0) {
        popupCloseIcon.forEach((el) => {
          el.addEventListener("click", (e) => {
            popupClose(el.closest(".modal"));
            e.preventDefault();
          });
        });
      }

      function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
          popupActive.classList.remove("open");
          if (doUnlock) {
            bodyUnlock();
          }
        }
      }

      function bodyLock() {
        body.classList.add("lock");
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, 600);
      }

      function bodyUnlock() {
        body.classList.remove("lock");
      }

      const textToCopyElement = document.getElementById("textToCopy");
      const copyButton = document.getElementById("copyButton");

      // Add a click event listener to the button
      const copySuccessMessage = document.getElementById("copySuccessMessage");

      copyButton.addEventListener("click", function () {
        const textToCopy = textToCopyElement.innerText;
        const input = document.createElement("input");
        input.setAttribute("value", textToCopy);
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(input);

        // Display the success message
        copySuccessMessage.style.display = "block";

        // Automatically hide the success message after a few seconds (e.g., 3 seconds)
        setTimeout(function () {
          copySuccessMessage.style.display = "none";
        }, 3000);
      });

      const logOutBtn = document.querySelector(".log__out");

      if (logOutBtn) {
        logOutBtn.addEventListener("click", () => {
          localStorage.removeItem("userAuthorized");
          location.reload();
        });
      }
    }
  }
  const firstName = document.querySelector("#input-name");
  const lastName = document.querySelector("#input-surname");
  const inputEmail = document.querySelector(".input-email");
  const inputPassword = document.querySelector(".input-password");

  const passwordError = document.querySelector(".password-error");
  const emailError = document.querySelector(".email-error");
  const nameError = document.querySelector(".name-error");
  const surNameError = document.querySelector(".last-name-error");
  // const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const signUpBtn = document.getElementById("register-button-submit");

  signUpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    disableScroll();
    e.preventDefault();

    let firstNameValue = firstName.value.split(/\s+/).join("");
    let lastNameValue = lastName.value.split(/\s+/).join("");
    let emailValue = inputEmail.value.split(/\s+/).join("");
    let passwordValue = inputPassword.value.split(/\s+/).join("");

    let validRegistration = false;
    nameError.textContent = "";
    if (firstNameValue.length <= 3) {
      nameError.classList.add("error");
      nameError.textContent = "must be at least 3 characters";
      validRegistration = true;
    } else {
      registerNameValue = `${firstNameValue[0].toUpperCase()}${firstNameValue
        .slice(1)
        .toLowerCase()}`;
      localStorage.setItem("UserName", registerNameValue);
    }
    surNameError.textContent = "";
    if (lastNameValue.length <= 3) {
      surNameError.classList.add("error");
      surNameError.textContent = "must be at least 3 characters";
      validRegistration = true;
    } else {
      registerLastNameValue = `${lastNameValue[0].toUpperCase()}${lastNameValue
        .slice(1)
        .toLowerCase()}`;
      localStorage.setItem("UserLastName", registerLastNameValue);
    }

    emailError.textContent = "";
    if (emailValue.length <= 3) {
      emailError.classList.add("error");
      emailError.textContent = "must be at least 3 characters";
      validRegistration = true;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(emailValue)
    ) {
      emailError.classList.add("error");
      emailError.textContent = "Email address is incorrect";
      validRegistration = true;
    } else if (emailValue === localStorage.getItem("UserEmail")) {
      emailError.classList.add("error");
      emailError.textContent = "This email address is already registered";
      validRegistration = true;
    } else {
      localStorage.setItem("UserMail", emailValue);
    }
    passwordError.textContent = "";
    if (passwordValue.length < 8) {
      passwordError.classList.add("error");
      passwordError.textContent = "Passwords must be eight characters or more";
      validRegistration = true;
    } else {
      localStorage.setItem("UserPassword", passwordValue);
    }

    const randomDecimal = Math.floor(Math.random() * 900000000) + 100000000;

    let randomHex = randomDecimal.toString(16).toUpperCase();

    while (randomHex.length < 9){
      randomHex = '0' + randomHex
    }

    localStorage.setItem("CardNumber", randomHex);

    if (validRegistration === true) {
      return;
    }

    popupClose(popupWindowRegister);
    location.reload();

    localStorage.setItem("userRegistered", true);
    localStorage.setItem("userAuthorized", true);
  });
});
