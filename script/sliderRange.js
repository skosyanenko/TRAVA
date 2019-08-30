$(document).ready(function() {

    $( "#slider-range" ).slider({
        range: true,
        min: 200,
        max: 2000,
        values: [ 700, 1200 ],
        step: 50,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.values[ 0 ] + " ₽ - " + ui.values[ 1 ] + " ₽");
        }
    });
    $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + " ₽ - " +
        $( "#slider-range" ).slider( "values", 1 ) + " ₽" );

    $('.wrap__pagination-inner a').on('click', function() {
        $(this).siblings().removeClass('wrap__pagination-active');
        $(this).addClass('wrap__pagination-active');
    });
});