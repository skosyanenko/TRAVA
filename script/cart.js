// let cartData = addElemToCart(), массив
   let cart = {};

checkCart();
showMiniCart();

//добавляем товар в корзину
const addToCart = function() {
    let articul = $(this).attr('data-atr');
    if (cart[articul] !== undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );
    showMiniCart();
};

//проверяю наличие корзины в localStorage;
function checkCart(){
    let getCart = localStorage.getItem('cart');
    if (getCart != null) cart = JSON.parse(getCart);
}

function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart) );
}

//показываю содержимое корзины
function showMiniCart(){
    let out ='';
    for (let w in cart){
        out += w + ' --- '+cart[w]+'<br>';
    }
    $('.wrap-cart__result').html(out);
}

// вывод элементов из массива в цикле в верстку
function renderElementsCart(arr, selector) {
    arr.map(item => {
        let itemLayout = '<div class="wrap__catalog-img">\n' +
            '            <img src="' + item.image + '" alt="">\n' +
            '        </div>\n' +
            '        <div class="wrap__catalog-name">' + item.title + '</div>\n' +
            '        <div class="wrap__catalog-price">' + item.price + ' руб.</div>\n';
        let $inner = $(selector);

        $inner.append(itemLayout);
    });
}

function showCart() {
    let out = '';
    for (let key in cart) {
        out += '<button class="delete" data-art="'+key+'" >x</button>';
        out += '<img src="'+goods[key].image+'" width="48">';
        out += goods[key].name;
        out += '<button class="minus" data-art="'+key+'">-</button>';
        out += cart[key];
        out += '<button class="plus" data-art="'+key+'">+</button>';
        out += cart[key]*goods[key].cost;
        out +='<br>';
    }
    $('.wrap__cart').html(out);
    $('.modal__content-add').on('click', plusGoods);
    $('.modal__content-substract').on('click', minusGoods);
    $('.delete').on('click', deleteGoods);
}

//увеличить количество товара на единицу
function addElem(){
    let articul = $(this).attr('id');
    cart[articul]++;
    saveCartToLS();
    showCart();
}

//уменьшить количество товара на единицу
function substractElem(){
    let articul = $(this).attr('id');
    if (cart[articul]>1) {
        cart[articul]--;
    }
    else {
        delete cart[articul];
    }
    saveCartToLS();//сохраняю корзину в localStorage
    showCart();
}

function deleteGoods(){
    let articul = $(this).attr('id');
    delete cart[articul];
    saveCartToLS();//сохраняю корзину в localStorage
    showCart();
}

function showElem(e) {
    e.preventDefault();
    let id = $(this).attr('id');
    let currentItem = plantsData[id];
    let modalImg = $('.modal__content-img'),
        modalName = $('.modal__content-name'),
        modalPrice = $('.modal__content-price'),
        modalSub = $('.modal__content-substract'),
        modalAdd = $('.modal__content-add');

    modalImg.attr('src', currentItem.image);
    modalName.text(currentItem.title);
    modalPrice.text(currentItem.price + ' руб.');
    modalSub.attr('data-atr', currentItem.id);
    modalAdd.attr('data-atr', currentItem.id);

    modalSub.on('click', substractElem);
    modalAdd.on('click', addElem);
}


