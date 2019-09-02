$(document).ready(function() {

    $('.burger').on('click', function(){
        $(this).toggleClass('open'); // меняется сам бургер
        if ($(window).width() <= 991) {
            $('.mobile-menu').toggleClass('show');
        } else {
            let time = 0;
            $('.nav-link').each(function( index, el ) {
                time += 200;
                setTimeout(() => $(el).toggleClass('close'), time); // меняется каждая ссылка
            });
        }
    });

    $('.wrapper__sidebar-loupe').on('click', function(){
        $('.wrapper__sidebar-search-input').toggleClass('active').focus();
        $('.wrapper__sidebar-loupe').toggleClass('active')
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
            ($(el).hasClass('wrapper__advantages-column') || $(el).hasClass('footer-wrapper') || $(el).hasClass('wrap__pagination') || $(el).hasClass('wrapper__socials-wrap')) ? diff = 1100 : '';

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

});




