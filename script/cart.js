let cart = [];

$(document).ready(function() {
    getCart();
    // вывод элементов из базы в корзину
    let cartItems = cart.map(item => {
       let currentItem = plantsData.find(x => x.id === item.id);

       if (currentItem === undefined && potsData) {
           currentItem = potsData.find(x => x.id === item.id);
           let obj = Object.assign({}, currentItem);
           obj.sizes = item.size;
           obj.count = item.count;
           obj.color = item.color;
           return obj;
       } else {
           let obj = Object.assign({}, currentItem);
           obj.sizes = item.size;
           obj.count = item.count;
           return obj;
       }
    });

    renderElementsCart(cartItems, '.wrap-cart__result');

    let $cartInput = $('.wrap-cart__input');
    let $cartColor = $('.cart-color');

    $cartColor.each((i, el) => {
       $(el).text() === 'undefined' ? $(el).parent().remove() : ''
    });

    // функция изменения количества товара при клике на соответствующие кнопки
    $('.wrap-cart__result-summ').each((i, item) => {
        let row = $(item).parents('.wrap-cart__result-product');
        let price = parseInt(row.find('.wrap-cart__result-price').text());
        let count = row.find('.wrap-cart__input').val();
        $(item).text(price*count + ' руб.');
    });

    // функция изменения итоговой суммы товара при изменении количества в инпуте
    $cartInput.on('change', function() {
        let $this = $(this),
            sum = $this.parent().next(),
            price = parseInt($this.parent().prev().text()),
            value = +$this.val();

        console.log(111);

        if (value < 0 || !$this.val()) {
            value = 1;
            $this.val(1);
        }

        sum.text(price*value + ' руб.');
        calcResult();
    });

    // валидация инпута количества товара на ввод только числовых значений
    $cartInput.on('keydown', function (e) {
        if ((e.which >= 48 && e.which <= 57)  // цифры
            || (e.which >=96 && e.which <= 105)  // num lock
            || e.which == 8 // backspace
            || (e.which >= 37 && e.which <= 40) // стрелки
            || e.which==46) // delete
        {
            return true;
        } else {
            return false;
        }
    });

    calcResult();
    $('.wrap-cart__substract').on('click', cartMinus);
    $('.wrap-cart__add').on('click', cartPLus);
    $('.wrap-cart__result-delete').on('click', deleteButton);
    $('#buttonCart').on('click', showFormCart);
    resultSumm();
    let getSumm = localStorage.getItem('summ');
    $('.wrapper__socials-summ').text(getSumm);
});

//добавляем товар в корзину
function addPlantToCart() {
    let id = $(this).attr('data-id'),
        count = $('.modal__content-numb').val(),
        size = $('.modal__content-about').find('.select__gap').text();
    $('.buttonBasket').text('Добавлено').toggleClass('button--moema');

    let newItem = {};
    newItem.id = +id;
    newItem.count = +count;
    newItem.size = +size;
    newItem.type = 'plant';

    if (!cart.length) {
        cart.push(newItem);
        saveCartToLS();
        return false;
    }
    console.clear();
    let cartIds = cart.map(item => item.id);
    if (!cartIds.includes(newItem.id)) {
        cart.push(newItem);
    } else {
       let index = cart.findIndex(x => x.id === newItem.id);
       cart[index].size === newItem.size ?
            cart[index].count += newItem.count : cart.push(newItem);
    }
    console.log(cart);
    saveCartToLS();
}

// вывод элементов из массива (Pots) в цикле в верстку
function addPotToCart() {
    let id = $(this).attr('data-id'),
        count = $('.mdl__content-numb').val(),
        size = $('.mdl__content-about').find('.select__gap')[0],
        color = $('.mdl__content-about').find('.select__gap')[1];
    $('.buttonBasket').text('Добавлено').toggleClass('button--moema');

    let newItem = {};
    newItem.id = +id;
    newItem.count = +count;
    newItem.size = $(size).text();
    newItem.color = $(color).text();
    newItem.type = 'pot';

    if (!cart.length) {
        cart.push(newItem);
        saveCartToLS();
        return false;
    }

    let cartIds = cart.map(item => item.id);

    if (!cartIds.includes(newItem.id)) {
        cart.push(newItem);
    } else {
        let index = cart.findIndex(item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color);
        index !== -1 ? cart[index].count += newItem.count : cart.push(newItem);
    }

    saveCartToLS();
}

//проверяю наличие корзины в localStorage;
function getCart(){
    let getCart = localStorage.getItem('cart');
    if (getCart != null) cart = JSON.parse(getCart);
}

function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

// вывод элементов из массива (Plants) в цикле в верстку
function renderElementsCart(arr, selector) {
    arr.map(item => {
        let itemLayout = '<div class="wrap-cart__result-product">\n' +
            '    <div class="wrap-cart__result-left">\n' +
            '        <div class="wrap-cart__result-img">\n' +
            '            <img src="' + item.image + '" alt="">\n' +
            '        </div>\n' +
            '        <div class="wrap-cart__result-container">\n' +
            '            <div class="wrap-cart__result-name">' + item.title + '</div>\n' +
            '            <div class="wrap-cart__result-size">размер: <span class="cart-size">' + item.sizes + '</span></div>\n' +
            '            <div class="wrap-cart__result-color">цвет: <span class="cart-color">' + item.color + '</span></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="wrap-cart__result-price">' + item.price + ' руб.</div>\n' +
            '    <div class="wrap-cart__result-quantity">\n' +
            '        <span class="wrap-cart__substract"></span>\n' +
            '        <input class="wrap-cart__input" type="text" value="' + item.count + '" maxlength="3">\n' +
            '        <span class="wrap-cart__add" data-max="' + item.maxCount + '"></span>\n' +
            '    </div>\n' +
            '    <span class="wrap-cart__result-summ"></span>\n' +
            '    <div class="wrap-cart__result-delContainer">' +
            '       <div class="wrap-cart__result-delete" id="'+ item.id + '"></div>\n' +
            '    </div>\n' +
            '</div>';
        let $inner = $(selector);

        $inner.append(itemLayout);
    });
}

// удаление товара из корзины
function deleteButton() {
    let $this = $(this),
        id = $this.attr('id'),
        size = $this.parent().parent().find('.cart-size').text(),
        color = $this.parent().parent().find('.cart-color').text(),
        count = $this.parent().parent().find('.wrap-cart__input').val();

    let index = cart.findIndex(x => {
        if (x.color && color) {
            return x.id === +id && x.size.toString() === size.toString() && x.color === color;
        } else {
            return x.id === +id && x.size.toString() === size.toString();
        }
    });

    let summ = localStorage.getItem('summ');
    summ -= count;
    localStorage.setItem('summ', summ);
    $('.wrapper__socials-summ').text(summ);

    if (index !== -1) cart.splice(index, 1);

    $this.parent().parent().fadeOut('fast', function () {
        $(this).remove();
        calcResult();
    });


    saveCartToLS();
}

// функция итоговой суммы товара
function calcSum(el, input) {
    const price = parseInt(el.parents('.wrap-cart__result-product').find('.wrap-cart__result-price').text());
    const value = +input.val();
    const sum = el.parents('.wrap-cart__result-product').find('.wrap-cart__result-summ');
    sum.text(price*value + ' руб.');
    calcResult();
}

// функция увеличения товара в корзине
function cartPLus() {
    let $this = $(this),
        $input = $this.prev(),
        count = parseInt($input.val()) + 1,
        max = parseInt($this.data('max'));

    count = count >= max ? max : count;
    $input.val(count);
    calcSum($this, $input);
}

// функция уменьшения товара в корзине
function cartMinus() {
    let $this = $(this),
        $input = $this.next(),
        count = parseInt($input.val()) - 1;

    count = count < 1 ? 1 : count;
    $input.val(count);
    calcSum($this, $input);
}

// функция итоговой суммы в корзине
function calcResult() {
    let result = 0;
    $('.wrap-cart__result-summ').each((i, item) => result += parseInt($(item).text()));
    $('.wrap-cart__total-result').text(result + ' руб.');
}

// функция вызова формы оформления покупки
function showFormCart (){
    let $formCart = $('.wrap-cart__form');
    $formCart.addClass('overlay');
    $formCart.fadeIn(300);
    $('body').addClass('no-scroll');
}

// функция общего количества товаров
function resultSumm() {
    let result = [],
        summ = 0;
    let getCart = localStorage.getItem('cart');
    if (getCart != null) getCart = JSON.parse(getCart);
    getCart.map(item => summ += item.count);

    localStorage.setItem('summ', summ);
}