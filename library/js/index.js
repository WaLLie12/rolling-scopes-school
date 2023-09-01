window.addEventListener("DOMContentLoaded", () =>{

console.log(`
1.Вёрстка соответствует макету. Ширина экрана 768px +26 \n
\t блок <header> +2
\t секция Welcome +2
\t секция About +2. Обратите внимание на появление новых элементов в виде стрелок.
\t ❗Обратите внимание. На макете в секции About расположены 3 точки навигации по слайдам под картинкой. Нужно сделать 5 точек, т.к. картинки лишь скрываются, а не пропадают. Если под картинкой находится 5 точек: +2
\t секция Favorites +4
\t секция CoffeShop +4
\t секция Contacts +4
\t секция LibraryCard +4
\t блок <footer> + 2 \n
 2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n
\t нет полосы прокрутки при ширине страницы от 1440рх до 640рх +4.
\t элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4.
\t элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4. Например, меню в хедере должно преобразоваться в бургер-меню до того, как элементы начнут наезжать друг на друга. \n
3.На ширине экрана 768рх реализовано адаптивное меню +12 : \n
\t\t если при ширине страницы в 768рх панель навигации не скрыта, а бургер-иконка не появилась (при этом учитывайте "Особенности проверки адаптивности в DevTools"), то ставим 0 за данный пункт, и дальше его не проверяем. Иначе:
при нажатии на бургер-иконку плавно появляется адаптивное меню +4
\t\t при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +4
\t\t ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +2
\t\t размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +2 \n
final band - 50
`)

const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav-navigation');
const body = document.body;

burger.addEventListener('click', (event) => {
    event.stopPropagation();
    burger.classList.toggle('active');
    if (burger.classList.contains('active')) {
        disableScroll();
    } else {
        enableScroll();
    }
    nav.classList.toggle('active');
});

body.addEventListener('click', (event) => {
    if (!event.target.closest('.header__nav-navigation')) {
        closeNav();
    }
});

document.querySelectorAll('.navigation__link').forEach((item) => {
    item.addEventListener('click', () => {
        closeNav();
    });
});

function closeNav() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    enableScroll();
}

function disableScroll() {
    body.classList.add('froze-scroll');
}

function enableScroll() {
    body.classList.remove('froze-scroll');
}

const swiper = new Swiper('.swiper', {
    spaceBetween: 26,
    keyboard: true,
    slidesPerView: 3,
    autoplay:{
        delay: 2000,
        stopOnLastSlide: true,
        disableOnInteraction: false
    },
    speed: 700,
    breakpoints:{
        260: {
            slidesPerView: 1
        },
        769: {
            slidesPerView: 2
        },
        1200:{
            slidesPerView: 3
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      clickable: true,
    },
  });

  const radioButtons = document.querySelectorAll('.custom__input');
  const contentBlocks = document.querySelectorAll('.favorite__books_half');
  const blocksPerPage = 4;
  
  function updateBlocksVisibility(selectedIndex) {
      contentBlocks.forEach((block, index) => {
              if (index >= selectedIndex * blocksPerPage && index < (selectedIndex + 1) * blocksPerPage) {
                      block.classList.add('fade-in', 'fade');
              } else {
                  block.classList.remove('fade-in', 'fade');
              }   
      });
  }
  
  radioButtons.forEach((radioButton, index) => {
      radioButton.addEventListener('change', () => {
       updateBlocksVisibility(index);
      });
  });
  
  // При загрузке страницы показываем содержимое для первой вкладки
  updateBlocksVisibility(0);
  
  
  })
  