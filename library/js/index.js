console.log(`
1. Вёрстка валидная +10.\n
2. Вёрстка семантическая.
\t  В коде страницы присутствуют следующие элементы (указано минимальное количество, может быть больше):
\t   -<header>, <main>, <footer> +2.
\t   -шесть элементов <section> (по количеству секций) +2.
\t   -только один заголовок <h1> +2.
\t   -пять заголовков <h2> +2.
\t   -один элемент <nav> (панель навигации в хедере) +2.
\t   -два списка ul > li > a (панель навигации, ссылки на соцсети в футере) +2.
\t   -семь кнопок <button> +2.
\t   -два инпута <input> +2.\n
3. Вёрстка соответствует макету
\t  - блок <header> +8:
\t\t    Стараемся, чтобы текст совпадал с макетом. Если есть небольшие отклонения, то главное для нас, чтобы расстояние между элементами меню было одинаковое, 30px.
\t\t    Элементы меню работают как якоря. При нажатии на один из них нас перебросит наверх соответствующего раздела.
\t\t    Сами элементы меню при наведении (эффект hover) должны быть интерактивными и обязательно курсор должен поменяться на cursor: pointer)
\t\t    Расстояние от самого меню до иконки пользователя - 40px. Иконка является отдельным элементом, и не входит в <nav>.
\t\t    Текст "Brooklyn Public Library" находится в <h1>.\n
\t  - секция Welcome +4.\n
\t  - секция About +6:
\t\t    Расстояния между кнопками пагинации 10px.
\t\t    Обратите внимание, что кнопки хоть и имеют вид круга, но интерактивная область (область нажатия, выделяемая cursor:pointer) должна быть размером +5px в каждую сторону.\n 
\t  - секция Favorites +8:
\t\t    Интерактивные кнопки должны иметь структуру input type="radio" + label.
\t\t    Добавьте небольшую область вокруг кнопки и надписи (например, 5px как в примере секции about) для того, чтобы была возможность легче наводить мышку.
\t\t    Кнопки "buy" должны быть интерактивными, плавно менять свой цвет при наведении на них, как указано в макете styleguides.
\t\t    Кнопка "own" не должна быть интерактивной, не должна нажиматься. И на ней должен присутствовать атрибут disabled.\n
\t  - секция CoffeeShop +6.\n
\t  - секция Contacts +6:
\t\t    Карту можно вставить просто картинкой.
\t\t    Везде, где в тексте встречаются цифры в виде телефонного номера, это должны быть ссылки с типом "tel" и номером.
\t\t    Там, где в тексте встречается текст с именем контактного лица, это должна быть ссылка с типом "mailto" и адресом почты.\n
\t  - секция LibraryCard +8:
\t\t    "Find your Library card" - это должна быть форма с полями input.
\t\t    Все 3 кнопки должны быть интерактивными, плавно менять свой цвет при наведении на них, как указано в макете styleguides.\n
\t  - блок <footer> +8:
\t\t    Адрес библиотеки должен быть ссылкой (место на карте, например).
\t\t    Иконки соцсетей также должны быть ссылками (можете вставить свои соцсети или любые другие аккаунты этих сервисов).
\t\t    Вместо Username должно быть ваше имя, как оно пишется на английском языке и ссылка на GitHub.\n
4.Общие требования к верстке
\t  -для построения сетки используются флексы  (display: flex) +2.
\t  -при уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону +2.
\t  -иконки добавлены в формате .svg.  +2.
\t  -изображения добавлены в формате .jpg (.jpeg) или .png +2.
\t  -есть favicon +2. 
\t  -плавная прокрутка по якорям +2
\t  -в футере название ссылки Username заменено и ведет на мой GitHub  +2.
\t  -в футере ссылка The Rolling Scopes School ведет на страницу курса https://rs.school/js-stage0/ +2.
\t  -интерактивность элементов согласно макету. +2.
\t  - плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы +2.
`)