$(document).ready(function() {
    let plantsData = [],
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

    // добавление каждого элемента в массив
    for (let prop in json) {
        let item = json[prop];
        plantsData.push(item);
    }

    renderElements();
    styledSelect('.wrap__menu-select');

    $sliderRange.slider(options);
    min = $sliderRange.slider("values", 0);
    max = $sliderRange.slider("values", 1);
    $("#amount").val(min + " ₽ - " + max + " ₽");
    showProducts(min, max);

    // modal
    $('.wrap__catalog-elem').on('click', function(e) {
        e.preventDefault();
        let id = $(this).attr('id');
        let currentItem = plantsData[id];
        let modalImg = $('.modal__content-img'),
            modalName = $('.modal__content-name'),
            modalPrice = $('.modal__content-price'),
            modalText = $('.modal__content-text .desc-text'),
            modalSelect = $('.select-modal');

        modalImg.attr('src', currentItem.image);
        modalName.text(currentItem.title);
        modalPrice.text(currentItem.price + ' руб.');
        modalText.text(currentItem.description);

        modalSelect.empty();

        currentItem.sizes.map(size => {
            let newOption = $('<option>', {
                value: size,
                text: size
            });
            modalSelect.append(newOption);
        });

        styledSelect('.select-modal');

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
        if (e.target !== popup[0] && popup.has(e.target).length === 0){
            $('.overlay').fadeOut();
            $('body').removeClass('no-scroll');
        }
    });

    // вывод элементов из массива в цикле в верстку
    function renderElements() {
        plantsData.map(item => {
            let itemLayout = '<a href="#" id="'+ item.id +'" class="wrap__catalog-elem '+ item.type + ' ' + item.sizes.join(' ') + '" data-price="' + item.price + '">\n' +
                '        <div class="wrap__catalog-img">\n' +
                '            <img src="' + item.image + '" alt="">\n' +
                '        </div>\n' +
                '        <div class="wrap__catalog-name">' + item.title + '</div>\n' +
                '        <div class="wrap__catalog-price">от ' + item.price + ' руб.</div>\n' +
                '    </a>';
            let $catalogInner = $('.wrap__catalog');

            $catalogInner.append(itemLayout);
        });
    }

    // стилизация селектов
    function styledSelect(selector) {
        $(selector).each(function () {
            let $this = $(this),
                selectOption = $this.find('option'),
                selectOptionLength = selectOption.length,
                selectedOption = selectOption.filter(':selected'),
                dur = 150;

            if (selector === '.select-modal' && $('.select__gap').length) {
                $this.unwrap('.select');
                $('.modal__content-about').find('.select__gap, .select__list').remove();
            }

            $this.hide();
            $this.wrap('<div class="select"></div>');
            console.log(selectOption.eq(0).text());
            $('<div>', {
                class: 'select__gap',
                text: selectOption.eq(0).text()
            }).insertAfter($this);

            let selectGap = $this.next('.select__gap');

            $('<ul>', {
                class: 'select__list'
            }).insertAfter(selectGap);

            let selectList = selectGap.next('.select__list');

            for (var i = 0; i < selectOptionLength; i++) {
                $('<li>', {
                    class: 'select__item',
                    html: $('<span>', {
                        text: selectOption.eq(i).text()
                    })
                })
                    .attr('data-value', selectOption.eq(i).val())
                    .appendTo(selectList);
            }

            let selectItem = selectList.find('li');

            selectList.slideUp(0);
            selectGap.on('click', function () {
                if (!$(this).hasClass('on')) {
                    $(this).addClass('on');
                    selectList.slideDown(dur);

                    selectItem.on('click', function () {
                        let chooseItem = $(this).data('value'),
                            $catalog = $('.wrap__catalog'),
                            filterValue = '',
                            $this = $(this),
                            $buttonGroup = $this.parents('.wrap__menu-container'),
                            filterGroup = $buttonGroup.attr('data-filter-group');

                        $('select').val(chooseItem).attr('selected', 'selected');
                        selectGap.text($(this).find('span').text());

                        if ($this.parents('.wrap__menu-container').length) {
                            filters[filterGroup] = $this.data('value');
                            filterValue = concatValues(filters);
                            $catalog.isotope({filter: filterValue});
                        }

                        selectList.slideUp(dur);
                        selectGap.removeClass('on');
                    });
                } else {
                    $(this).removeClass('on');
                    selectList.slideUp(dur);
                }
            });
        });
    }

    function concatValues(obj) {
        let value = '';
        for (let prop in obj) {
            value += obj[prop];
        }
        return value;
    }

    function showProducts(minPrice, maxPrice) {
        let availableFilter = concatValues(filters);

        $('.wrap__catalog-elem' + availableFilter).hide().filter(function() {
            let price = parseInt($(this).data("price"), 10);
            return price >= minPrice && price <= maxPrice;
        }).show().addClass('showElem');

        $('.wrap__catalog').isotope({ filter: '.showElem'});
        $('.wrap__catalog-elem').removeClass('showElem');
    }
});