$(document).ready(function() {

    $('.burger').on('click', function(){
        let time = 0;
        $(this).toggleClass('open'); // меняется сам бургер
        $('.nav-link').each(function( index, el ) {
           time += 200;
           setTimeout(() => $(el).toggleClass('close'), time); // меняется каждая ссылка
        });
    });

    $('.wrapper__sidebar-loupe').on('click', function(){
        $('.wrapper__sidebar-search-input').toggleClass('active').focus();
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
            ($(el).hasClass('wrapper__advantages-column')) ? diff = 1100 : '';

            if (windowScroll >= elementTop - diff) {
                setTimeout(() => {
                    $(el).addClass('active');
                }, time);
            }
        });
    });

    $('.wrapper__advantages-button').on('click', function(){
        let btnFlag = 'active-button';

        if(!$(this).hasClass(btnFlag)) {
            $('.wrapper__advantages-range').toggleClass('range-none')
        }
        $('.wrapper__advantages-button').removeClass(btnFlag);
        $(this).addClass(btnFlag);
    });
});
