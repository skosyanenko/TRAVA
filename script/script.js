let min,
    max,
    firstLoad = false,
    itemsOnPage = 6,
    plantsData = addDataToArray(plants),
    $sliderRange = $("#slider-range"),
    $catalog = $('.wrap__catalog'),
    $paginationInner = $('.wrap__pagination-inner'),
    options = {
        range: true,
        min: 100,
        max: 600,
        values: [100, 350],
        step: 50,
        slide: function (event, ui) {
            let min = ui.values[0],
                max = ui.values[1];
            $("#amount").val(min + " ₽ - " + max + " ₽");
            filters.minPrice = min;
            filters.maxPrice = max;
            initPagination(filterProducts(filters));
        }
    },
    filters = {
        plant: '',
        size: '',
        minPrice: options.values[0],
        maxPrice: options.values[1]
    };

if (window.pots && Object.keys(window.pots).length > 0) {
    var potsData = addDataToArray(window.pots);
}

$(document).ready(function() {
    // подгрузка элементов в модальное окно из JSON
    $('.wrap__catalog-elem').on('click', showModal('modal'));
    $('.wrap__catalog-el').on('click', showModal('mdl'));

    // закрыть модальное окно по клику вне окна или на крестик
    $(document).on('mouseup', closeModal);

    // открытие/закрытие меню при клике на бургер-меню
    $('.burger').on('click', function(){
        $(this).toggleClass('open'); // меняется сам бургер
        if ($(window).width() <= 991) {
            if ($('.searchInner__columns').hasClass('flex')) {
                toggleColumns('close');
                $(this).addClass('open');
            } else {
                $('.mobileMenu').toggleClass('show');
            }
        } else {
            let time = 0;
            $('.nav-link').each(function( index, el ) {
                time += 200;
                setTimeout(() => $(el).toggleClass('close'), time); // меняется каждая ссылка
            });
        }
    });

    // ссылки на страницы по соответствующему названию
    $('.nav-link').on('click', function() {
        let href = $(this).attr('href');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(href).offset().top
        }, 500);
    });

    // инициируем (триггерим) событие скролла при загрузке
    setTimeout(() => $(window).trigger('scroll'), 10);

    $(window).on('scroll', function () {
        $('[data-anim]').each(function (i, el) {
            let time = $(el).data('anim'), // дата атрибут задержки по времени э-та
                elementTop = $(el).offset().top, // верхняя граница элемента
                windowScroll = $(window)[0].scrollY, // верхняя граница окна браузера
                diff = 700; // разница между верхней границей элемента и окна браузера (по умолчанию)

            time *= 1000; // умножение на 1000 для удобства, чтобы изначально вписывать время в секундах

            // проверяем, если этот элемент принадлежит к тем,
            // которые внизу страницы, то увеличиваем разницу diff
            ($(el).hasClass('wrapper__advantages-column') || $(el).hasClass('footerWrapper') || $(el).hasClass('wrapper__socials-wrap')) ? diff = 1100 : '';

            if (windowScroll >= elementTop - diff) {
                setTimeout(() => {
                    $(el).addClass('active');
                }, time);
            }
        });
    });

    // смена табов на главной странице при клике на кнопки
    $('.advantagesButton').on('click', function(){
        let btnFlag = 'active-button';

        setTimeout(() => $(window).trigger('scroll'), 10);

        if(!$(this).hasClass(btnFlag)) {
            $('.wrapper__advantages-range').toggleClass('range-none')
        }
        $('.advantagesButton').removeClass(btnFlag);
        $(this).addClass(btnFlag);
    });

});




