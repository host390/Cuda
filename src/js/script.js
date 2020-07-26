
document.addEventListener("DOMContentLoaded", () => {
    
    // меню бургер ================================================================================================
	let burgName = 'menu__burger', // введите имя класс бургера
    listName = 'menu__list', // введите имя класс ul меню
    burger = document.querySelector(`.${burgName}`), // находим оболочку бyргера
    list = document.querySelector(`.${listName}`), // находим ul c навигацией
    maxWidthMob = 700; // при каком складываем в бургер???

    function menuBurger () {
        
        burger.addEventListener('click', function(event) { // ставим обработчик на бургер
            burger.classList.toggle(`${burgName}_active`) // при нажатии на бургер появляется крестик (актив)
            list.classList.toggle(`${listName}_active`) // и листу ul даётся класс актив

            if (burger.classList.contains(`${burgName}_active`)) { // если нажали на меню то...
                document.body.style.overflow = 'hidden'; // запрещяем прокрутку body

                backBlack.style.display = 'block'; // врубаем чёрный бэграунд

            } else { // если меню не активно то...
                document.body.style.overflow = 'auto'; // разрешаем прокрутку меню

                backBlack.style.display = 'none'; // вырубаем чёрный фон
            };
        });

        // если экран резко переходит в моб, то мы врубаем свойства...
        window.addEventListener('resize', function() { // следим за именением экрана
            if (document.documentElement.clientWidth > maxWidthMob) { // если он меньше того, когда появляется бургер...
                document.body.style.overflow = 'auto'; // разрешаем прокрутку

                backBlack.style.display = 'none'; // вырубаем чёрный бэк
            }
            // если пользователь переходит из десктопа в моб при вклёчённом бургере 
            else if (burger.classList.contains(`${burgName}_active`)) { // если бургер активен...
                document.body.style.overflow = 'hidden'; // запрещяем прокрутку

                backBlack.style.display = 'block'; // врубаем бэг
            }
            else { // ели чёт не то, то нечё не делаем
                return false
            }
        }) 
    }
    menuBurger ();
    // ==============================================================================================================

    // Чёрный беграунд ===========================================================================================
	let backBlack = document.querySelector('.backblack') // находим чёрный бэграунд

	function bacBlac() {
		backBlack.addEventListener('click', function() { // даём обработчик на него
			burger.classList.remove(`${burgName}_active`);  // при нажатии дожны убераться все окна что мешают...
			list.classList.remove(`${listName}_active`); // Надо сделать, но в следующем проекте...
			document.body.style.overflow = 'auto';
			backBlack.style.display = 'none';
		});
	};
	bacBlac();
    // ===========================================================================================================

    // Красививый переход li меню при уменьшении экрана или увеличении li =========================================================================================
	/* 
		!! Пока работает только для 2 рядов !!
		Чтоб использовать скрипт надо:
		1) Иметь меню нужного плана
	*/
	let mainMenu = document.querySelector('.menu__list'), // находим ul главного меню
        firstChildLi = mainMenu.firstElementChild, // в этом меню находим 1-ый li
        lastChildLi = mainMenu.lastElementChild, // и последный li
        firstChildLiStyle = getComputedStyle(firstChildLi), // узнаём все стили у 1-ого li
        lastChildLiStyle = getComputedStyle(lastChildLi), // узнаём все стили у последнего li
        firstMarg = firstChildLiStyle.marginLeft, // узнаём margin-left у 1-ого li
        lastMarg = lastChildLiStyle.marginRight; // узнаём margin-right у последнего li

    function tranNumb (str1, str2) { // функция интепритирует данные (пример: вход-'1234px' выход-'1234)
        let x = parseInt(str1.match(/\d+/)); // переводим строку с px в число без px
        let y = parseInt(str2.match(/\d+/)); // переводим строку с px в число без px
        sum = y - x; // вычитаем из 2 чила 1
        lastChildLi.style.marginRight = sum + 'px'; // полученный результат даём последнему li
    };

    tranNumb(firstMarg, lastMarg); // srt1 это marginLeft 1-ого li, srt1 это margin-right последнего li

    window.addEventListener('resize',function() { // следим за изменением ширины экрана
        lastChildLi.style.marginRight = 'auto'; // ставим последнему li margin-right: auto;
        firstChildLiStyle = getComputedStyle(firstChildLi); // обновляем данные 
        lastChildLiStyle = getComputedStyle(lastChildLi);
        firstMarg = firstChildLiStyle.marginLeft;
        lastMarg = lastChildLiStyle.marginRight;
        
        tranNumb(firstMarg, lastMarg) // перезапускаем функцию с новыми данными
    });
    // ==========================================================================================================

    // Плавный скролл на чистом JS ==================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Установить href у ссылки (пример <a href="#home" class="">Home</a>)
		2) Установить id секции (пример <section id='home'></section>)
		3) heightFixedMedu ищется высота прикреплённого хедера
	*/
	function animScroll() {
		let upA = document.querySelectorAll('a[href*="#"]'); // находим все ссылки начинающиеся на # (Это точно якори)

		for (let i = 0; i < upA.length; i++) { // забускаем цикл по всем ссылкам
			upA[i].addEventListener('click', function(event) { // Ставим обработчик на все якори

				event.preventDefault(); // отрубаем действие по умолчанию
				let href = this.getAttribute('href'); // получем href ссылки на которую кликнули
				let elemntAnchor = document.querySelector(href); // находим элемент, на котором стоит этот якорь
				// eсли это не якорь то не трогаем, хз как определить того чего нет :(

				if (href == '#up') { //если в href ссылки добавить #up, то скролл дойдёт до начала
					// window.scrollTo(0, 0)
					scrollUp() // вызываем соответствующую функцию
				} else {
                    if (window.pageYOffset > elemntAnchor.offsetTop) { // если экран ниже элемента то...
                        scrollTop(elemntAnchor.offsetTop - heightFixedMedu); // вызываем соответствующую функцию и - высоту fixed menu
                    } else if (window.pageYOffset < elemntAnchor.offsetTop) { //если экран выше элемента то...
                        scrollBottom(elemntAnchor.offsetTop - heightFixedMedu); // вызываем соотвктствующую функцию и - высоту fixed menu
                    } else { // если экран находится в одной координате с элементом то...
                        window.scrollTo(0, elemntAnchor.offsetTop - heightFixedMedu); // экран становтся в координату элемента и - высоту fixed menu
                    };
                };
			});
		};

		function scrollTop(elemntAnchor) { // функция вызывается если экран выше элемента
			if (window.pageYOffset > elemntAnchor) { // если координата экрана больше координаты элемента то...
				window.scrollTo(0, window.pageYOffset - 50); // скролим вверх по 50px за раз
				setTimeout(scrollTop, 1, elemntAnchor); // ждём 1 милисекунду и повторяем функцию
			} else { // если мы дошли до нужной координаты , то оставляем скролл на корде элемента
				window.scrollTo(0, elemntAnchor);
			};
		};

		function scrollBottom(elemntAnchor) { // функция вызывается если экран выше элемента
			if (window.pageYOffset < elemntAnchor) { // если координата экрана меньше координаты элемента то...
				window.scrollTo(0, window.pageYOffset + 50); // скролим вниз по 50px за раз
				setTimeout(scrollBottom, 1, elemntAnchor); // ждём 1 милисекунду и повторяем функцию
			} else { // если мы дошли до нужной координаты , то оставляем скролл на корде элемента
				window.scrollTo(0, elemntAnchor);
			};
		};

		function scrollUp() { // функция скролит экран в координату 0 0 (для стрелочки up)
			if (window.pageYOffset > 0) {
				window.scrollTo(0, window.pageYOffset - 50)
				setTimeout(scrollUp, 1)
			} else {
				window.scrollTo(0, 0)
			}
		}
	};
	animScroll ();
	// ==========================================================================================================

    // Подмена активов хедела при скроле к секции =========================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Иметь меню нужного плана
		2) поставить якорь на ссылку и на элемент
		<a href="#home" class="menu__link">Home</a>
		<div class='team' id='home'></div>
	*/
	let headerRow = document.querySelector('.header__row'), // находим оболочку меню которая даёт высоту при fixed
	    heightFixedMedu = headerRow.offsetHeight; // отслеживаем высоту fixed меню

	function activMenuZone() {
		let aHrefAll = document.querySelectorAll('.menu__list>li>a[href*="#"]'), // находим все ссылки главного меню
			arrHref = [], // создаём массив для href всех ссылок
			zoneAllArr = []; // создаём массив для зон

		for (let i = 0; i < aHrefAll.length; i++) { // проходимся по каждой сслыки
			arrHref.push(aHrefAll[i].getAttribute('href')); // помещяем в массив href
			zoneAllArr.push(document.querySelector(arrHref[i])); // ниходим все зоны по хрефам ссылок
		};
		
		window.addEventListener('scroll', function() { // при скролле...
			heightFixedMedu = headerRow.offsetHeight; // обновляем высоту fixed меню
			fullHeigth = window.pageYOffset + heightFixedMedu; // координата окна сверху +  высотра прекреплённого хедера
		
			for (let i = 0; i < aHrefAll.length; i++) { // проходимся по каждой координатной области зон
				// если верхняя кордината экрана больше или равно верхней координаты какой либо зоны и если верхняя кордината экрана
				// меньше или равно нижней координаты зоны то... (если мы попали в оду из зон)
				if (fullHeigth >= zoneAllArr[i].offsetTop && fullHeigth <= zoneAllArr[i].offsetTop + zoneAllArr[i].offsetHeight) {
					let linkAct = headerMenu.querySelector(`a[href*="${zoneAllArr[i].getAttribute('id')}"]`); // находим якорь этой зоны
		
					let linkLastAct = headerMenu.querySelector('.menu__link_active'); // находим последнюю активную зону в хедере
					if (linkLastAct == null) { // если изначально не активных то...
						linkAct.classList.add('menu__link_active'); // даём актив ссылки сейчасной зоны
					} else { // если есть активные то...
						linkLastAct.classList.remove('menu__link_active'); // удаляем последний актив
						linkAct.classList.add('menu__link_active'); // даём актив ссылки сейчасной зоны
					};
				};
			};
		});
	};
	activMenuZone();
	// ==========================================================================================================
    
    // Плавное появление и скрытие Стрелки вверх =========================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Добавить HTML 
		2) Добавить CSS
        3) Настроить перемнную cordVis
        ttgrg
        rtgrg
        rtgrtg
        trg
    */
	let upArrow = document.querySelector('a[href*="#up"]'), // находим эту стрелку
	    cordVis = 1000; // после какой координаты по Y появляемся? (отсчитываем от верхнего левого угла)

	function visibUpArrow () {
        window.addEventListener('scroll', function() { // отслеживаем скролл
            if (window.pageYOffset > cordVis) { // если мы дошли до нужной точки то...
                upArrow.style.cssText = ('visibility: visible; opacity: 1;'); // даём стили
            } else { // если экран ещё выше координаты появления то...
                upArrow.style.cssText = ('visibility: hidden; opacity: 0;'); // даём стили
            };
        });
	};
	visibUpArrow ();
	// ==========================================================================================================

    // IBG =========================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Установить блоку с тегом img class="ibg"
		ПРИМЕР: 
		<div class="Bg ibg">
			<img src="img..." alt="">
		</div>
		2) Проверяем чтоб стояли CSS свойства
	*/
	function ibg () {
		let allItems = document.querySelectorAll('.ibg'), // находим все контенеры с классом ibg
			itemsImage, // переменная для картинок
			src; // переменная для src
		for (let i = 0; i < allItems.length; i++) { // проходим по всем элементам и ...
			itemsImage = allItems[i].querySelector('img'); // находим в них картинку
			src = itemsImage.getAttribute('src'); // узнаём их src
			allItems[i].style.backgroundImage = `url(${src})`; // вставляем src в url background-image
		};
	};
	ibg ();
	// ==========================================================================================================

    // Процентные круги =========================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Добавить блок с кругом в HTML
		2) Добавить CSS стили
		3) Написать % class='circle__percent' (он 0 до 100)
		4) Скорость регулируется в CSS
		5) Чтоб поменять цвет добавляем классу circle__valve и circle__after style="background-color: #30bae7;"
	*/
	let podlo = document.querySelectorAll('.circle__podlo'), // находим все элементы круга(-ов)
        circleA = document.querySelectorAll('.circle__after'),
        circleB = document.querySelectorAll('.circle__before'),
        valve = document.querySelectorAll('.circle__valve'),
        percent = document.querySelectorAll('.circle__percent'),
        after = document.querySelectorAll('.circle__after');

	function circlePercent () {
		for (let i = 0; i < percent.length; i++) { // у каждого круга
			let pres = percent[i].firstChild.textContent; // находим его процент
			let deg = pres * 3.6; // переводим процент в градусы
			podlo[i].style.transform = `rotate(${deg}deg)`; // добавляем стиль transform
			if (deg < 180) { // если меньше 50%
				circleB[i].style.zIndex = '9'; // раставляеv z-index
				podlo[i].style.zIndex = '7';
				circleA[i].style.setProperty('z-index', "6", "important");

				valve[i].style.animationName = 'circle__valve'; // даём нужные анимации
				after[i].style.animationName = 'circle__after';
			} else if (deg > 360) { // если больше 100%
				alert ('не надо > 100%'); // на это ещё не расчитано
				return false;
			} else if (deg >= 180) { // если больше или равно 50%
				circleB[i].style.zIndex = '9'; // раставляеv z-index
				valve[i].style.zIndex = '5';
				podlo[i].style.zIndex = '6';
				circleA[i].style.setProperty('z-index', "7", "important");

				circleB[i].style.animationName = 'circle__before'; // даём нужные анимации
				valve[i].style.animationName = 'circle__valve';
				after[i].style.animationName = 'circle__after';
			};
		};
	};
	// circlePercent ();

	// МОЖНО ДОРОБОТАТЬ В СЛЕДУЮЩЕМ ПРОЕКТЕ, МОЖЕТ НАКОПЛЮСЬ ОПЫТА...
	//появление анимации кругов при скроде до определённой координаты
	let circleRow = document.querySelector('.skills__row')
	let circleCord = circleRow.offsetTop +  (circleRow.offsetHeight - 20) / 2 // 20 ненужный padding
	let clienHeigt = document.documentElement.clientHeight

	if (window.pageYOffset + clienHeigt >= circleCord) {
	    // console.log ('давай') 
	    //Если вспомню то лучше выделить зону и если экран попадает на эту зону, то анимация срабатывает, но как это сделать??? %^% !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	    circlePercent()
	}
	window.addEventListener('scroll', function() {
	    if (window.pageYOffset + clienHeigt >= circleCord) {
	        // console.log ('давай')

	        circlePercent()
	    }
	})
	// ==========================================================================================================

    // Стили для placeholder в input =========================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Копировать блок в HTML
		2) Установить стилии CSS
		3) Ширина, высота и все стили настраиваются в CSS
	*/
	function myInput () {
		let myInput = document.querySelectorAll('.myinput'), // находим все блоки майинпут
		inputPlaceholder = document.querySelectorAll('.myinput__placeholder'), // в них пласхолдер
		input = document.querySelectorAll('.myinput__input'); // и сам тег импут

		let arrPlac = []; // создаём массив куда поместим всё что находится в placeholder
		for (let i = 0; i < myInput.length; i++) { // проходимя по каждому блоку майимпут
			arrPlac.push(`${inputPlaceholder[i].innerHTML}`); // добавляем в массив контент placeholder
			myInput[i].addEventListener('input', function() { // устанавливаем каждому омпуту обработчик 'input'
				if (input[i].value != '') { // если пользоватьль что-то пишет то...
					inputPlaceholder[i].innerHTML = ''; // быстро вырубаем содержимое placeholder
				} else { // если пользоватьель ещё ничего не написал или всё стёр то...
					inputPlaceholder[i].innerHTML = `${arrPlac[i]}`; // очень быстро вставляем собержимое placeholder
				};
			});
		};
	};
	myInput ();
	// ==========================================================================================================

    // прицепление меню при скроле вниз =========================================================================================
	function fixHed () {
		let header = document.querySelector('header'), // находим хедер
			hedCord = header.offsetTop; // находим верхную левую координату хедера
		function fh (cordHed) { // функция проверки 
			if (window.pageYOffset > cordHed) { // если верхняя координата окна больше координаты меню то...
				header.style.cssText = 'position:fixed; top:0px;'; // прицкпляем heder сверху
			} else { // если верхняя координата окна меньше координаты меню то...
				header.style.cssText = 'position:absolute;'; // пользователь находится вверху
			};
		};
		fh (hedCord) // передаём её в функцию
		window.addEventListener('scroll', function() { // при прокрутки страницы
			fh (hedCord); // обновляем состояние условия
		});
	};
	fixHed();
	// ==========================================================================================================

    // Переключалка активных элементах у хедера при нажатии =========================================================================================
	let headerMenu = document.querySelector('.header__menu') // находим меню хедера
	function activMenuAitems () {
		headerMenu.addEventListener('click', function(event) { // при клике на это меню...
			headMenuActive (event.target, event.currentTarget); // передаём в функцию элемент куда нажали и на чём был обработчик
		});
		function headMenuActive(et, ec) { // запускаем проверочную функцию
			if (et.tagName != 'A') return; // если это не сыллка, то не надо нам
			if (ec.querySelector('.menu__link_active') == null) { // если изначально нет активов то...
				event.preventDefault(); // вырубаем действие по умолчанию
				et.classList.add('menu__link_active'); // даём нажатому актив
			} else { // если изначально есть актив то...
				ec.querySelector('.menu__link_active').classList.remove('menu__link_active'); // удаляем у него актив
				event.preventDefault(); // вырубаем действие по умолчанию
				et.classList.add('menu__link_active'); // даём класс актив
			};
		};
	};
	activMenuAitems();
	// ==========================================================================================================

    // Подмена активов хедела при скроле к секции =========================================================================================
	/*
		Чтоб использовать скрипт надо:
		1) Иметь меню нужного плана
		2) поставить якорь на ссылку и на элемент
		<a href="#home" class="menu__link">Home</a>
		<div class='team' id='home'></div>
	*/
	// let headerRow = document.querySelector('.header__row'), // находим оболочку меню которая даёт высоту при fixed
	heightFixedMedu = headerRow.offsetHeight; // отслеживаем высоту fixed меню

	function activMenuZone() {
		let aHrefAll = document.querySelectorAll('.menu__list>li>a[href*="#"]'), // находим все ссылки главного меню
			arrHref = [], // создаём массив для href всех ссылок
			zoneAllArr = []; // создаём массив для зон

		for (let i = 0; i < aHrefAll.length; i++) { // проходимся по каждой сслыки
			arrHref.push(aHrefAll[i].getAttribute('href')); // помещяем в массив href
			zoneAllArr.push(document.querySelector(arrHref[i])); // ниходим все зоны по хрефам ссылок
		};
		
		window.addEventListener('scroll', function() { // при скролле...
			heightFixedMedu = headerRow.offsetHeight; // обновляем высоту fixed меню
			fullHeigth = window.pageYOffset + heightFixedMedu; // координата окна сверху +  высотра прекреплённого хедера
		
			for (let i = 0; i < aHrefAll.length; i++) { // проходимся по каждой координатной области зон
				// если верхняя кордината экрана больше или равно верхней координаты какой либо зоны и если верхняя кордината экрана
				// меньше или равно нижней координаты зоны то... (если мы попали в оду из зон)
				if (fullHeigth >= zoneAllArr[i].offsetTop && fullHeigth <= zoneAllArr[i].offsetTop + zoneAllArr[i].offsetHeight) {
					let linkAct = headerMenu.querySelector(`a[href*="${zoneAllArr[i].getAttribute('id')}"]`); // находим якорь этой зоны
		
					let linkLastAct = headerMenu.querySelector('.menu__link_active'); // находим последнюю активную зону в хедере
					if (linkLastAct == null) { // если изначально не активных то...
						linkAct.classList.add('menu__link_active'); // даём актив ссылки сейчасной зоны
					} else { // если есть активные то...
						linkLastAct.classList.remove('menu__link_active'); // удаляем последний актив
						linkAct.classList.add('menu__link_active'); // даём актив ссылки сейчасной зоны
					};
				};
			};
		});
	};
	activMenuZone();
	// ==========================================================================================================

    // Переключалка контента с меню =========================================================================================
	/* 
		Чтоб использовать скрипт надо:
		1) иметь меню с конпками или ссылками
		2) ставить контент группами и у нах должна быть общая оболочка
	*/
	let navList = document.querySelector('.navbar__list'), // нходим оболочку переключалок
    navItemsAll = navList.querySelectorAll('.navbar__link'), // находим все ссылки или кноки меню
    contentRow = document.querySelector('.portfolio__body'), // находим большой контейнер со всеми контейнерами меню
    portfolioRowAll = document.querySelectorAll('.portfolio__row'); // находим все конейнеры с содержимым

    function contentswitchMenu() {
        navList.addEventListener('click', function(event) { // при клике на один из пунктов
            // alert(event.target.tagName)
            if (event.target.tagName != 'A') return // если не ссылка, то не надо
            event.preventDefault(); // отменяем дейстиве по умолчанию
            linkActive(event.target, event.currentTarget); // запускаем функцию в которую передаём куда нажали и сам контейнер
            for (let i = 0; i < navList.children.length; i++) { // проходимся по всем li контейнера конопок переключения
                // если 1 из содержимых совпало с содержимым клика то... 
                if (navItemsAll[i].textContent == event.target.textContent) {
                    portfolioRowActive(i); // мы передаём туда номер этого пункта меню
                };
            };
        });
        
        function linkActive(et, ec) {
            let prevesAcrive = ec.querySelector('.navbar__link_active'); // если есть активная менюшка то...
            if (prevesAcrive) {
                prevesAcrive.classList.remove('navbar__link_active'); // удаляем у нё класс актив
                et.classList.add('navbar__link_active'); // даём актив нажатому
            } else { // если нету...
                et.classList.add('navbar__link_active'); // просто даём актив нажатому
            };
        };
        
        function portfolioRowActive(i) {
            let activPortfolioRow = contentRow.querySelector('.portfolio__row_active'); // находим активный класс
            if (portfolioRowAll[i] == undefined) { // если зона не создана то...
                if (activPortfolioRow) { // проверяем есть ли активная зона
                    activPortfolioRow.classList.remove('portfolio__row_active'); // удалем у самого первого элемента класс актив
                    return false; // ничё не делаем
                } else { // если нету активного то...
                    return false; // ничё не делаем
                }
            }
            if (activPortfolioRow) { // если есть предыдущий актив то...
                activPortfolioRow.classList.remove('portfolio__row_active'); // удалем у самого первого элемента класс актив
                portfolioRowAll[i].classList.add('portfolio__row_active'); // добавляем текущему
            } else { // если у предыдущего нету актива то...
                if (portfolioRowAll[i]) { // проверяем существует ли эта зона вообще
                    portfolioRowAll[i].classList.add('portfolio__row_active'); // если да, то даём актив текущему
                } else if (portfolioRowAll[i] == null) { // если зоны нету то...
                    return false; // ничё не делаем
                } else { // на всякий случай 
                    return false; // тоже ничё не делаем
                };
            };
        };
    };
    contentswitchMenu();
    // ==========================================================================================================


});



// старый код не смотреть!!!

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

// Чёрный беграунд
// let backBlack = document.querySelector('.backblack')

// // // меню бургер (Надо донастроить для всех сайтов)

// let burgName = 'menu__burder',
//     listNmae = 'menu__list',menu__list
//     burger = document.querySelector(`.${burgName}`),
//     list = document.querySelector(`.${listNmae}`);
    
// burger.addEventListener('click', function(event) {
//     burger.classList.toggle(`${burgName}_active`)
//     list.classList.toggle(`${listNmae}_active`)

//     if (burger.classList.contains(`${burgName}_active`)) {
//         document.body.style.overflow = 'hidden'
//         backBlack.style.display = 'block'
//     } else {
//         document.body.style.overflow = 'auto'
//         backBlack.style.display = 'none'
//     }
// })

// backBlack.addEventListener('click', function() {
//     burger.classList.remove(`${burgName}_active`)
//     list.classList.remove(`${listNmae}_active`)
//     document.body.style.overflow = 'auto'
//     backBlack.style.display = 'none'
// })

// // если экрон резко переходит в десктоп, то мы врубаем свойства

// window.addEventListener('resize', function() {
//     // console.log (document.documentElement.clientWidth) // ширина окна
//     if (document.documentElement.clientWidth > 700) {
//         document.body.style.overflow = 'auto';
//         backBlack.style.display = 'none';
//     }
//     else if (burger.classList.contains(`${burgName}_active`)) {
//         document.body.style.overflow = 'hidden';
//         backBlack.style.display = 'block';
//     }
//     else {
//         return false
//     }
// }) 


// function ibg () {
//     let allItems = document.querySelectorAll('.ibg');
//     let itemsImage
//     let src
//     for (let i = 0; i < allItems.length; i++) {
//         itemsImage = allItems[i].querySelector('img');
//         src = itemsImage.getAttribute('src');
//         allItems[i].style.backgroundImage = `url(${src})`;
//     }
// }
// ibg ()



// function circle () {
//     let podlo = document.querySelectorAll('.circle__podlo'),
//         circleA = document.querySelectorAll('.circle__after'),
//         circleB = document.querySelectorAll('.circle__before'),
//         valve = document.querySelectorAll('.circle__valve'),
//         percent = document.querySelectorAll('.circle__percent'),
//         after = document.querySelectorAll('.circle__after');
//         // !!! можно их находить при загрузке ещё чтоб не нагружать лишний раз !!!
//     for (let i = 0; i < percent.length; i++) {
//         let pres = percent[i].firstChild.textContent
//         let deg = pres * 3.6
//         // alert(deg)
//         podlo[i].style.transform = `rotate(${deg}deg)`;
//         if (deg < 180) {
//             circleB[i].style.zIndex = '9';
//             podlo[i].style.zIndex = '7';
//             circleA[i].style.setProperty('z-index', "6", "important");

//             valve[i].style.animationName = 'circle__valve';
//             after[i].style.animationName = 'circle__after';

//         } else if (deg > 360) {
//             alert ('не надо > 100%');
//             return false;

//         } else if (deg >= 180) {
            
//             // circleB[i].style.cssText = 'animation-name: circle__before; z-index: 9;';
//             circleB[i].style.zIndex = '9';
//             valve[i].style.zIndex = '5';
//             podlo[i].style.zIndex = '6';
//             circleA[i].style.setProperty('z-index', "7", "important");

//             circleB[i].style.animationName = 'circle__before';
//             valve[i].style.animationName = 'circle__valve';
//             after[i].style.animationName = 'circle__after';

//             // valve[i].style.cssText = 'z-index: 5; , animation-name: circle__valve;'
//             // valve[i].style.animationName = 'circle__valve;'
//         } 
//     }
// }
// //появление анимации кругов при скроде до определённой координаты

// let circleRow = document.querySelector('.skills__row')
// let circleCord = circleRow.offsetTop +  (circleRow.offsetHeight - 20) / 2 // 20 ненужный padding
// let clienHeigt = document.documentElement.clientHeight

// if (window.pageYOffset + clienHeigt >= circleCord) {
//     // console.log ('давай') 
//     //Если вспомню то лучше выделить зону и если экран попадает на эту зону, то анимация срабатывает, но как это сделать??? %^% !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//     circle()
// }
// window.addEventListener('scroll', function() {
//     if (window.pageYOffset + clienHeigt >= circleCord) {
//         // console.log ('давай')

//         circle()
//     }
// })


// function myInput () {
//     let myInput = document.querySelectorAll('.myinput'),
//     inputPlaceholder = document.querySelectorAll('.myinput__placeholder'),
//     input = document.querySelectorAll('.myinput__input');

//     let arrPlac = [];
//     for (let i = 0; i < myInput.length; i++) {
//         arrPlac.push(`${inputPlaceholder[i].innerHTML}`)
//     }
//     for (let i = 0; i < myInput.length; i++) {
//         myInput[i].oninput = function() {
//             if (input[i].value != '') {
//                 inputPlaceholder[i].innerHTML = ''
//             } else {
//                 inputPlaceholder[i].innerHTML = `${arrPlac[i]}`
//             }
//         }
//     }
// }
// myInput ()

// // Плавное появление и удаление upArrow
// let upArrow = document.querySelector('a[href*="#up"]')

// window.addEventListener('scroll', function() {
//     if (window.pageYOffset > 1000) {
//         upArrow.style.visibility = 'visible';
//         upArrow.style.opacity = '1';
//     } else {
//         upArrow.style.visibility = 'hidden';
//         upArrow.style.opacity = '0';
//     }
// })

// function animScroll() {

//     let upA = document.querySelectorAll('a[href*="#"]')

//     for (let i = 0; i < upA.length; i++) {
//         upA[i].addEventListener('click', function(event) {

//             event.preventDefault()
//             let href = this.getAttribute('href')
//             // alert (href)
//             // let zone = document.querySelector(href).classList
//             // alert(zone)
//             if (href == '#up') { //если в href ссылки добавить #up, то скролл дойдёт до начала
//                 // window.scrollTo(0, 0)
//                 scrollUp()
//             } else {
//                 let box = document.querySelector(href)
//                 //Если это не якорь то не трогаем, хз как определить того чего нет :(

//                 if (window.pageYOffset > box.offsetTop) {
//                     scrollTop(box.offsetTop)
//                 } else if (window.pageYOffset < box.offsetTop) {
//                     scrollBottom(box.offsetTop)
//                 } else {
//                     window.scrollTo(0, box.offsetTop)
//                 }
//             }
            
//         })
//     }

//     function scrollUp() {
//         if (window.pageYOffset > 0) {
//             window.scrollTo(0, window.pageYOffset - 50)
//             setTimeout(scrollUp, 1)
//         } else {
//             window.scrollTo(0, 0)
//         }
//     }

//     function scrollTop(box) {
//         if (window.pageYOffset > box) {
//             window.scrollTo(0, window.pageYOffset - 50)
//             setTimeout(scrollTop, 1, box)
//         } else {
//             window.scrollTo(0, box)
//         }
//     }

//     function scrollBottom(box) {
//         if (window.pageYOffset < box) {
//             window.scrollTo(0, window.pageYOffset + 50)
//             setTimeout(scrollBottom, 1, box)
//         } else {
//             window.scrollTo(0, box)
//         }
//     }
// }
// animScroll ()


// // Комбайн для главного меню
// let mainMenu = document.querySelector('.menu__list')
// let firstChildLi = mainMenu.firstElementChild
// let lastChildLi = mainMenu.lastElementChild

// function f (str1, str2) {
//     let x = parseInt(str1.match(/\d+/))
//     let y = parseInt(str2.match(/\d+/))
//     // console.log(x + 'это сколько слева' , y + 'это сколоько права')
//     sum = y - x
//     // console.log(sum)
//     // Нам надо ещё опять подставлять auto и отчситывать
//     lastChildLi.style.marginRight = sum + 'px';
// }

// let firstChildLiStyle = getComputedStyle(firstChildLi)
// let lastChildLiStyle = getComputedStyle(lastChildLi)
// let firstMarg = firstChildLiStyle.marginLeft
// let lastMarg = lastChildLiStyle.marginRight

// f(firstMarg, lastMarg)

// window.addEventListener('resize',function(){

//     lastChildLi.style.marginRight = 'auto';
//     let firstChildLiStyle = getComputedStyle(firstChildLi)
//     let lastChildLiStyle = getComputedStyle(lastChildLi)
//     let firstMarg = firstChildLiStyle.marginLeft
//     let lastMarg = lastChildLiStyle.marginRight
    
//     f(firstMarg, lastMarg)
// });
// // прицепление меню при скроле вниз
// let header = document.querySelector('header')

// function fh (cordHed) {
//     // console.log ('header ' + header.offsetTop + '  window ' + window.pageYOffset)
//     if (window.pageYOffset > cordHed) {
//         // console.log(window.pageYOffset > header.offsetTop)
//         // header.style.position = 'fixed'
//         // header.style.position = 'fixed'
//         header.style.cssText = 'position:fixed; top:0px;'
//     } else {
//         header.style.cssText = 'position:absolute;'
//     }
// }

// function fixHed () {
    
//     let hedCord = header.offsetTop
//     fh (hedCord)
//     // let cord = header.getBoundingClientRect()
//     // alert (cord.y)

//     // alert (header.offsetTop) // координата верхнего левого угла шапки
//     // alert (window.pageYOffset)
    
//     // можно меньше кода ???? ---> function <---
//     window.addEventListener('scroll', function() {
//         fh (hedCord)
//         // if (header.offsetTop < window.pageYOffset) {
//         //     // header.style.position = 'fixed'
//         //     // header.style.position = 'fixed'
//         //     header.style.cssText = 'position:fixed; top:0px;'
//         // } else {
//         //     header.style.cssText = 'position:absolute;'
//         // }
//     })
// }
// fixHed()

// // переключалка меню hedera
// let headerMenu = document.querySelector('.header__menu')

// // let prevesHeadMenuActive
// headerMenu.addEventListener('click', function(event) {
//     headMenuActive (event.target, event.currentTarget)
// })


// function headMenuActive(et, ec) {
//     if (et.tagName != 'A') return;
//     ec.querySelector('.menu__link_active').classList.remove('menu__link_active');
//     event.preventDefault();
//     // if (prevesHeadMenuActive) {
//     //     prevesHeadMenuActive.classList.remove('menu__link_active');
//     // }
//     et.classList.add('menu__link_active');
//     // prevesHeadMenuActive = et
// }

// // реализация перемены активных классов при скроле к нужной секции
// // находим все названия ийдишек

// let aHrefAll = document.querySelectorAll('.menu__list>li>a[href*="#"]')

// let arrHref = []

// for (let i = 0; i < aHrefAll.length; i++) {
//     arrHref.push(aHrefAll[i].getAttribute('href'))
// }

// // можно сделать их вместе
// let zoneAllArr = []
// for (let i = 0; i < aHrefAll.length; i++) {
//     zoneAllArr.push(document.querySelector(arrHref[i]))
// }
// // alert(zoneAllArr)

// // alert(zoneAllArr[3].offsetTop)
// // ДААААААААААА!!!!
// window.addEventListener('scroll', function() {
//     // fullHeigth = window.pageYOffset + document.documentElement.clientHeight
//     fullHeigth = window.pageYOffset + 50 // 50 это высотра прекреплённого хедера

//     // console.log (zoneAllArr[3].offsetTop)
//     // console.log (zoneAllArr[3].offsetTop + zoneAllArr[3].offsetHeight)
//     for (let i = 0; i < aHrefAll.length; i++) {
//         if (fullHeigth >= zoneAllArr[i].offsetTop && fullHeigth <= zoneAllArr[i].offsetTop + zoneAllArr[i].offsetHeight) {
//             // console.log(zoneAllArr[i].getAttribute('class'))
//             // zoneAllArr[i].classList.add('.menu__link_active')
//             let linkAct = headerMenu.querySelector(`a[href*="${zoneAllArr[i].getAttribute('id')}"]`)
//             let linkLastAct = headerMenu.querySelector('.menu__link_active')
//             linkLastAct.classList.remove('menu__link_active')
//             linkAct.classList.add('menu__link_active')
//         } 
//     }
    
// })

// // переключалка меню 
// let prevesAcrive
// let prevesePortfolioRow

// let navList = document.querySelector('.navbar__list')
// let portfolioRowAll = document.querySelectorAll('.portfolio__row')
// // alert(navList.children.length)
// // alert(navList.children[2].firstElementChild.textContent)
// navList.addEventListener('click', function(event) {
    
//     // alert(event.target.tagName)
//     if (event.target.tagName != 'A') return
//     event.preventDefault()
//     // alert(event.target.innerHTML)
//     // event.target.classList.add('navbar__link_active');
//     linkActive(event.target)
//     for (let i = 0; i < navList.children.length; i++) {
//         if (navList.children[i].firstElementChild.textContent == event.target.textContent) {
//             // alert(i)
            
//             // portfolioRowAll[i].classList.add('portfolio__row_active')
//             portfolioRowActive(i)
//         }
//     }
// })

// function portfolioRowActive(i) {
//     portfolioRowAll[0].classList.remove('portfolio__row_active')
//     if (portfolioRowAll[i] == undefined) {
//         // alert('контента нету пока-что!')
//         prevesePortfolioRow.classList.remove('portfolio__row_active')
//         return
//     }
//     if (prevesePortfolioRow) {
//         prevesePortfolioRow.classList.remove('portfolio__row_active')
//     }

//     portfolioRowAll[i].classList.add('portfolio__row_active')
//     prevesePortfolioRow = portfolioRowAll[i]

// }

// function linkActive(et) {
//     // если у кого-то по дефолду есть класс аксив, то убрать его
//     if (event.currentTarget.firstElementChild.firstElementChild.classList.contains('navbar__link_active')) {
//         event.currentTarget.firstElementChild.firstElementChild.classList.remove('navbar__link_active')
//     }
//     if (prevesAcrive) {
//         prevesAcrive.classList.remove('navbar__link_active')
//     }
//     et.classList.add('navbar__link_active')
//     prevesAcrive = et
// }
