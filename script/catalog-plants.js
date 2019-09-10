let plantsData = addDataToArray(plants),
    filters = {},
    $sliderRange = $("#slider-range"),
    options = {
        range: true,
        min: 100,
        max: 600,
        values: [100, 450],
        step: 50,
        slide: function (event, ui) {
            let min = ui.values[0],
                max = ui.values[1];
            $("#amount").val(min + " ₽ - " + max + " ₽");
            showProducts(min, max);
        }
    },
    min,
    max;

if (window.pots && Object.keys(window.pots).length > 0) {
    var potsData = addDataToArray(window.pots);
}

$(document).ready(function() {
    renderElements(plantsData, '.wrap__catalog');

    // renderElementsCart(cartData, '.wrap-cart__result');

    styledSelect('.wrap__menu-select');

    initPriceSlider();

    showProducts(min, max);

    // подгрузка элементов в модальное окно из JSON
    $('.wrap__catalog-elem').on('click', showModal('modal'));
    $('.wrap__catalog-el').on('click', showModal('mdl'));

    // закрыть модальное окно по клику вне окна или на крестик
    $(document).on('mouseup', closeModal);
});

// инициализация ползунка цены
function initPriceSlider() {
    $sliderRange.slider(options);
    min = $sliderRange.slider("values", 0);
    max = $sliderRange.slider("values", 1);
    $("#amount").val(min + " ₽ - " + max + " ₽");
}

// вывод элементов из массива в цикле в верстку
function renderElements(arr, selector) {
    arr.map(item => {
        let itemLayout = '<a href="#" id="'+ item.id +'" class="wrap__catalog-elem '+ item.type + ' ' + item.sizes.join(' ') + '" data-price="' + item.price + '">\n' +
            '        <div class="wrap__catalog-img">\n' +
            '            <img src="' + item.image + '" alt="">\n' +
            '        </div>\n' +
            '        <div class="wrap__catalog-name">' + item.title + '</div>\n' +
            '        <div class="wrap__catalog-price">от ' + item.price + ' руб.</div>\n' +
            '    </a>';
        let $inner = $(selector);

        $inner.append(itemLayout);
    });
}

// одновременное использование фильтров
function showProducts(minPrice, maxPrice) {
    let availableFilter = concatValues(filters);

    $('.wrap__catalog-elem' + availableFilter).hide().filter(function() {
        let price = parseInt($(this).data("price"), 10);
        return price >= minPrice && price <= maxPrice;
    }).show().addClass('showElem');

    $('.wrap__catalog').isotope({ filter: '.showElem'});
    $('.wrap__catalog-elem').removeClass('showElem');
}
