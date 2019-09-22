$(document).ready(function() {
    let titles = addDataToArray(plants);
    let searchIcon = '.wrapper__sidebar-searchImg';
    $(searchIcon).on('click', function() {
        $('body').toggleClass('no-scroll');
        let $columnWrap = $('.searchInner__columns');
        if ($columnWrap.hasClass('flex')) {
            toggleColumns('close');
        } else {
            toggleColumns('open');
        }
    });

    // вызов фунции открытия поиска при клике на иконку лупы
    $('#search').on('change', function () {
        let query = $(this).val();
        let result = titles.filter(item => item.title.toLowerCase().includes(query));
        let $searchInner = $('.searchInner__wrapper');
        $('body').toggleClass('no-scroll');
        $searchInner.empty();

        // вывод в окно поиска элементов, подходящих по запросу
        if(result.length > 0 && query !== '') {
            result.map(item => {
                let itemLayout = '<a href="#" id="'+ item.id +'" class="wrap__catalog-elem elem-search '+ item.type + ' ' + item.sizes.join(' ') + '" data-price="' + item.price + '">\n' +
                    '        <div class="wrap__catalog-img">\n' +
                    '            <img src="' + item.image + '" alt="">\n' +
                    '        </div>\n' +
                    '        <div class="wrap__catalog-name name-search">' + item.title + '</div>\n' +
                    '        <div class="wrap__catalog-price price-search">от ' + item.price + ' руб.</div>\n' +
                    '    </a>';
                $searchInner.append(itemLayout);
                $('.wrap__catalog-elem').on('click', showModal('modal'));
            });
        } else {
            $searchInner.append('<h2>По вашему запросу ничего не найдено</h2>');
        }
    });
});

// функция открывания/закрывания поиска
function toggleColumns(action) {
    let $columnWrap = $('.searchInner__columns'),
        $searchInner = $('.searchInner');
    let timings = [];
    if (action.length) {
        (action === 'open') ? $columnWrap.addClass('flex') : '';

        // анимация столбцов с помощью дата-атрибута
        $('.searchInner__column').each(function (i, el) {
            let time = $(el).data('col');
            time *= 1000;
            timings.push(time);
            setTimeout(() => {
                $(el).toggleClass('active');
            }, time);
        });

        // открывание окна поиска
        if (action === 'open') {
            let max = Math.max.apply(null, timings) + 700;
            setTimeout(() => {
                $searchInner.addClass('active').css('z-index', '101');
                $('#superSearch').focus();
            }, max)
        }

        // закрывание окна поиска
        if (action === 'close') {
            let max = Math.max.apply(null, timings) + 50;
            $searchInner.removeClass('active').css('z-index', '0');
            $('.searchInner__wrapper').empty();
            $('#superSearch').val('');
            setTimeout(() => {
                $columnWrap.removeClass('flex');
                $('body').removeClass('no-scroll');
            }, max)
        }
    }
}