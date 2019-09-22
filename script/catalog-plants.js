$(document).ready(function() {

    // при первой загрузке - общий массив фильтруется по цене
    let startData = filterProducts(filters);

    // рендерятся первые шесть элементов
    renderElements(startData.slice(0,6), $catalog);

    // по этому массиву создается пагинация
    initPagination(startData);

    // первая загрузка прошла
    firstLoad = true;

    // стилизация селектов
    styledSelect('.wrap__menu-select');

    // инициализация ползунка цены
    initPriceSlider();

    // подгрузка элементов в модальное окно из JSON
    $('.wrap__catalog-elem').on('click', showModal('modal'));
    $('.wrap__catalog-el').on('click', showModal('mdl'));

    // закрыть модальное окно по клику вне окна или на крестик
    $(document).on('mouseup', closeModal);
});

// рендер пагинации
function initPagination(items) {
    let pageCount = Math.ceil(items.length / itemsOnPage);
    let $prevNext = $('.next, .prev');

    // после первой загрузки - перерисовываем элементы при смене страницы
    if (firstLoad) {
        $catalog.empty();
        renderElements(items.slice(0, 6), $catalog);
        // очищаем предыдущую пагинацию и кнопки "назад", "вперед"
        $paginationInner.empty();
        $prevNext.remove();
    }

    // если нет элементов
    if (items.length < 1 || !items) {
        // $catalog.text('Ничего не найдено');
        $catalog.append('<h3>По вашему запросу ничего не найдено</h3>')
    }

    // если меньше 7 элементов - не рисуем пагинацию и ост вып-ние функции
    if (pageCount <= 1) {
        $prevNext.remove();
        return null;
    }

    // рисуем кнопки "следующая", "предыдущая"
    createNavLinks(items);

    // рисуем ссылки - цифры
    createPaginationLinks(pageCount);

    // обработчик нажатия на ссылки цифры
    $('.wrap__pagination-link:not(".next"):not(".prev")').on('click', function() {
        let $this = $(this),
            pageNum = $this.html();

        let newArr = calculatePageElements(pageNum - 1, items);
        renderNewPage($this, newArr);
    });
}

// инициализация ползунка цены
function initPriceSlider() {
    $sliderRange.slider(options);
    min = $sliderRange.slider("values", 0);
    max = $sliderRange.slider("values", 1);
    $("#amount").val(min + " ₽ - " + max + " ₽");
}

// вывод элементов из массива в верстку
function renderElements(arr, el) {
    arr.map(item => {
        let itemLayout = $('<a href="#" id="'+ item.id +'" class="wrap__catalog-elem" data-price="' + item.price + '">\n' +
            '        <div class="wrap__catalog-img">\n' +
            '            <img src="' + item.image + '" alt="">\n' +
            '        </div>\n' +
            '        <div class="wrap__catalog-name">' + item.title + '</div>\n' +
            '        <div class="wrap__catalog-price">от ' + item.price + ' руб.</div>\n' +
            '    </a>');
        el.append(itemLayout);
        itemLayout.animate({'opacity': '1'}, 100);
    });
}

// фильтрация всего массива по цене (по умолчанию) и по типу/размеру
function filterProducts(filters) {
    const { plant, size, minPrice, maxPrice } = filters;

    let priceFilter = plantsData.filter(item => {
        return item.price >= minPrice && item.price <= maxPrice
    });

    let isPlant = plant.length;
    let isSize = size.toString().length;

    if (!isPlant && !isSize) {
        return priceFilter;
    }

    if (isPlant && isSize) {
        return priceFilter.filter(item => {
            return item.type === plant && item.sizes.includes(size)
        })
    }

    if (!isPlant && isSize) {
        return priceFilter.filter(item => {
            return item.sizes.includes(size)
        })
    }

    if (isPlant && !isSize) {
        return priceFilter.filter(item => {
            return item.type === plant
        })
    }
}

// создание ссылок пагинации
function createPaginationLinks(pageCount) {
    for (let i = 1; i<= pageCount; i++) {
        let $link = $('<a class="wrap__pagination-link">');

        if (i === 1) $link.addClass('active');

        $paginationInner.append($link.html(i));
    }
}

// создание кнопок "вперед" "назад"
function createNavLinks(items) {
    $('<a class="wrap__pagination-link prev">').text('Предыдущая').insertBefore($paginationInner);
    $('<a class="wrap__pagination-link next">').text('Следующая').insertAfter($paginationInner);

    $('.next, .prev').on('click', function () {
        let $this = $(this),
            activeNum = parseInt($('.wrap__pagination-link.active').text()),
            linkCount = $('.wrap__pagination-link').length - 2;

        if ($this.hasClass('next') && activeNum <= linkCount - 1) {
            let newArr = calculatePageElements(activeNum, items);
            renderNewPage($('.wrap__pagination-link.active').next(), newArr);
        } else if ($this.hasClass('prev') && activeNum > 1){
            let newArr = calculatePageElements(activeNum - 2, items);
            renderNewPage($('.wrap__pagination-link.active').prev(), newArr);
        }
    });
}

// рендер при смене страницы
function renderNewPage(activeElement, arr) {
    activeElement.addClass('active').siblings().removeClass('active');

    $catalog.empty();
    renderElements(arr, $catalog);

    $('.wrap__catalog-elem').on('click', showModal('modal'));
}

// возвращает массив из 6 элементов (предыдущих / следующих)
function calculatePageElements(startNum, items) {
    let start = startNum * itemsOnPage,
        end = start + itemsOnPage,
        Arr = items.slice(start, end);

    return Arr;
}