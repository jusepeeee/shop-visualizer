const shoppingBag = document.getElementById('shopping-bag'); //shopping-bag button
const cart = document.getElementById('cart'); //shopping-bag dropdown menu

shoppingBag.addEventListener('click', (e) => {
    e.stopPropagation();
    if(cart.classList.contains('hidden')){
        cart.classList.remove('hidden');
    }
    else {
        cart.classList.add('hidden');
    }
})

document.addEventListener('click', () => {
    if(!cart.classList.contains('hidden')){
        cart.classList.add('hidden');
    }
})