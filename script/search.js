$(document).ready(function() {
    let titles = addDataToArray(plants);
    let searchIcon = '.wrapper__sidebar-searchImg';
    $(searchIcon).on('click', function() {
        let $columnWrap = $('.search-inner__columns');
        if ($columnWrap.hasClass('flex')) {
            toggleColumns('close');
        } else {
            toggleColumns('open');
        }
    });

    $('#superSearch').on('change', function () {
        let query = $(this).val();
        let result = titles.filter(item => item.title.toLowerCase().includes(query));

        let $searchInner = $('.search-inner__wrapper');
        $searchInner.empty();

        if(result.length > 0 && query !== '') {
            result.map(item => {
                let itemLayout = '<a href="#" id="'+ item.id +'" class="wrap__catalog-elem + elem-search '+ item.type + ' ' + item.sizes.join(' ') + '" data-price="' + item.price + '">\n' +
                    '        <div class="wrap__catalog-img">\n' +
                    '            <img src="' + item.image + '" alt="">\n' +
                    '        </div>\n' +
                    '        <div class="wrap__catalog-name + name-search">' + item.title + '</div>\n' +
                    '        <div class="wrap__catalog-price + price-search">от ' + item.price + ' руб.</div>\n' +
                    '    </a>';
                $searchInner.append(itemLayout);
                $('.wrap__catalog-elem').on('click', showModal('modal__content'));
            });
        } else {
            $searchInner.append('<h2>По вашему запросу ничего не найдено</h2>');
        }
    });
});

function toggleColumns(action) {
    let $columnWrap = $('.search-inner__columns'),
        $searchInner = $('.search-inner');
    let timings = [];
    if (action.length) {
        (action === 'open') ? $columnWrap.addClass('flex') : '';

        $('.search-inner__column').each(function (i, el) {
            let time = $(el).data('col');
            time *= 1000;
            timings.push(time);
            setTimeout(() => {
                $(el).toggleClass('active');
            }, time);
        });

        if (action === 'open') {
            let max = Math.max.apply(null, timings) + 700;
            setTimeout(() => {
                $searchInner.addClass('active').css('z-index', '101');
                $('#superSearch').focus();
            }, max)
        }

        if (action === 'close') {
            let max = Math.max.apply(null, timings) + 50;
            $searchInner.removeClass('active').css('z-index', '0');
            $('.search-inner__wrapper').empty();
            $('#superSearch').val('');
            setTimeout(() => {
                $columnWrap.removeClass('flex');
            }, max)
        }
    }
}