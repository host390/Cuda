
// Пока не надо, но пусть будет
// function testWebP(callback) {
//     let webP = new Image();
//     webP.onload = webP.onerror = function () {
//         callback(webP.height == 2);
//     };
//     webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }
// testWebP(function (support) {
//     if (support == true) {
//         document.querySelector('body').classList.add('webp');
//     } else {
//         document.querySelector('body').classList.add('no-webp');
//     }
// });



// меню бургер (Надо донастроить для всех сайтов)

// let burger = document.querySelector('.navbar__burger'),
//     body = document.querySelector('.navbar__body');

// burger.addEventListener('click', function(event) {
//     burger.classList.toggle('navbar__burger_active')
//     body.classList.toggle('navbar__body_active')

//     if (burger.classList.contains('navbar__burger_active')) {
//         document.body.style.overflow = 'hidden'
//     } else {
//         document.body.style.overflow = 'scroll'
//     }
// })

// какя-то функция которая посиоянно следит за шириной экрана
// если экран больше > 767px то наэать на книпку меню 





function ibg () {
    let allItems = document.querySelectorAll('.ibg');
    let itemsImage
    let src
    for (let i = 0; i < allItems.length; i++) {
        itemsImage = allItems[i].querySelector('img');
        src = itemsImage.getAttribute('src');
        allItems[i].style.backgroundImage = `url(${src})`;
    }
}
ibg ()
    



// slick

// $(document).ready(function() {
//     $('.carousel__wrapper').slick({
//         arrows: false,
//         dots: true,
//         adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 2500,
//     });
// });





