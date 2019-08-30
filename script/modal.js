$(document).ready(function() {

    // открыть по кнопке
    $('.wrap__catalog-elem').on('click', function(e) {
        e.preventDefault();
        $('.overlay').fadeIn().css("display", "flex");
        $('body').toggleClass('no-scroll');
    });

// закрыть на крестик
    $('.modal__content-close').on('click', function() {
        $('.overlay').fadeOut();
        $('body').removeClass('no-scroll');
    });

// закрыть по клику вне окна
    $(document).on('mouseup', function (e) {
        let popup = $('.modal__content');
        if (e.target != popup[0] && popup.has(e.target).length === 0){
            $('.overlay').fadeOut();
            $('body').removeClass('no-scroll');
        }
    });
});
