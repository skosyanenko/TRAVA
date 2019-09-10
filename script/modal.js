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
            modalButton = $('.button-basket');

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

        modalImg.attr('src', currentItem.image);
        modalName.text(currentItem.title);
        modalPrice.text(currentItem.price + ' руб.');
        modalText.text(currentItem.description);
        modalButton.attr('data-atr', currentItem.id);
        modalSub.attr('data-atr', currentItem.id);
        modalAdd.attr('data-atr', currentItem.id);

        modalButton.on('click', addToCart);
        modalSub.on('click', substractElem);
        modalAdd.on('click', addElem);

        styledSelect('.select-modal');

        $('.'+className).fadeIn().css('display', 'flex');
        $('body').toggleClass('no-scroll');
    }
}

function closeModal(e) {
    let popup = $('.modal__content, .mdl__content');
    if ((e.target !== popup[0] && popup.has(e.target).length === 0) ||
        $(e.target).hasClass('modal__content-close') ||
        $(e.target).hasClass('mdl__content-close')) {

        $('.overlay').fadeOut();
        $('body').removeClass('no-scroll');
    }
}