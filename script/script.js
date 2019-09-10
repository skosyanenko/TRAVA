$(document).ready(function() {

    $('.burger').on('click', function(){
        $(this).toggleClass('open'); // меняется сам бургер
        if ($(window).width() <= 991) {
            if ($('.search-inner__columns').hasClass('flex')) {
                toggleColumns('close');
                $(this).addClass('open');
            } else {
                $('.mobile-menu').toggleClass('show');
            }
        } else {
            let time = 0;
            $('.nav-link').each(function( index, el ) {
                time += 200;
                setTimeout(() => $(el).toggleClass('close'), time); // меняется каждая ссылка
            });
        }
    });

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
            ($(el).hasClass('wrapper__advantages-column') || $(el).hasClass('footer-wrapper') || $(el).hasClass('wrapper__socials-wrap')) ? diff = 1100 : '';

            if (windowScroll >= elementTop - diff) {
                setTimeout(() => {
                    $(el).addClass('active');
                }, time);
            }
        });
    });

    $('.wrap__pagination-inner a').on('click', function() {
        $(this).siblings().removeClass('wrap__pagination-active');
        $(this).addClass('wrap__pagination-active');
    });

    $('.wrapper__advantages-button').on('click', function(){
        let btnFlag = 'active-button';

        setTimeout(() => $(window).trigger('scroll'), 10);

        if(!$(this).hasClass(btnFlag)) {
            $('.wrapper__advantages-range').toggleClass('range-none')
        }
        $('.wrapper__advantages-button').removeClass(btnFlag);
        $(this).addClass(btnFlag);
    });

});




