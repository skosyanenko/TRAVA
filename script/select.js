// функция стилизации селектов
function styledSelect(selector) {
    $(selector).each(function () {
        let $this = $(this),
            selectOption = $this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            dur = 150;

        if (selector === '.select-modal' && $('.select__gap').length) {
            $this.unwrap('.select');
            $this.parent().find('.select__gap, .select__list').remove();
        }

        $this.hide();
        $this.wrap('<div class="select"></div>');

        $('<div>', {
            class: 'select__gap',
            text: selectOption.eq(0).text()
        }).insertAfter($this);

        let selectGap = $this.next('.select__gap');

        $('<ul>', {
            class: 'select__list'
        }).insertAfter(selectGap);

        let selectList = selectGap.next('.select__list');

        for (let i = 0; i < selectOptionLength; i++) {
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
                        $this = $(this),
                        $buttonGroup = $this.parents('.wrap__menu-container'),
                        filterGroup = $buttonGroup.attr('data-filter-group');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectGap.text($(this).find('span').text());

                    if ($this.parents('.wrap__menu-container').length) {
                        filters[filterGroup] = $this.data('value');
                        initPagination(filterProducts(filters));
                        $('.wrap__catalog-elem').on('click', showModal('modal'));
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