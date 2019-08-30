$(document).ready(function() {

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
