$(document).ready(function () {
    $('.buttonBasket.plants').on('click', addPlantToCart);
    $('.modal__content-substract').on('click', () => substractButton('modal'));
    $('.modal__content-add').on('click', () => addButton('modal'));

    $('.buttonBasket.pots').on('click', addPotToCart);
    $('.mdl__content-substract').on('click', () => substractButton('mdl'));
    $('.mdl__content-add').on('click', () => addButton('mdl'));
});
// добавление содержимого в модальное окно из JSON при клике на соответствующий товар
function showModal(className) {
    return function(e) {
        e.preventDefault();
        let id = $(this).attr('id');
        let currentItem;
        let modalImg = $('.'+className+'__content-img'),
            modalName = $('.'+className+'__content-name'),
            modalPrice = $('.'+className+'__content-price'),
            modalText = $('.'+className+'__content-text .desc-text'),
            modalSub = $('.'+className+'__content-substract'),
            modalAdd = $('.'+className+'__content-add'),
            modalSelect = $('.select-modal'),
            modalButton = $('.buttonBasket');

        if (className !== 'mdl') {
            currentItem = plantsData[id];
            modalSelect.empty();
            currentItem.sizes.map(size => {
                let newOption = $('<option>', {
                    value: size,
                    text: size
                });
                modalSelect.append(newOption);
            });
        } else {
            currentItem = potsData[id];
        }

        styledSelect('.select-modal');

        modalImg.attr('src', currentItem.image);
        modalName.text(currentItem.title);
        modalPrice.text(currentItem.price + ' руб.');
        modalText.text(currentItem.description);
        modalButton.attr('data-id', currentItem.id);

        $('.'+className).fadeIn().css('display', 'flex');
        $('body').toggleClass('no-scroll');
    }
}

// функция закрытия модального окна при клике на крестик/вне окна
function closeModal(e) {
    let popup = $('.modal__content, .mdl__content, .formCart');
    if ((e.target !== popup[0] && popup.has(e.target).length === 0) ||
        $(e.target).hasClass('modal__content-close') ||
        $(e.target).hasClass('mdl__content-close') ||
        $(e.target).hasClass('formCart__content-close')) {

        $('.overlay').fadeOut();
        $('body').removeClass('no-scroll');
        $('.modal__content-numb').val(1);
        $('.mdl__content-numb').val(1);
        $('.buttonBasket').text('Добавить в корзину');
    }
}

// функция уменьшения количества товара в модальном окне
function substractButton(type) {
    let $input = $('.'+ type +'__content-numb'),
        count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
}

// функция увеличения количества товара в модальном окне
function addButton(type) {
    let $input = $('.'+ type +'__content-numb');
    $input.val(parseInt($input.val()) + 1);
}

