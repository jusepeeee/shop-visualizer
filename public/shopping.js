let shoppingCart = [];

function createItemWallet(item){
    const itemContainer = document.createElement('div');
    itemContainer.id = 'item-' + item.id;
    itemContainer.className = 'cart-flex';
    
    const itemImageContainer = document.createElement('div');
    itemImageContainer.className = 'img-container-cart';
    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImageContainer.appendChild(itemImage);

    const itemDescriptionContainer = document.createElement('div');
    itemDescriptionContainer.className = 'item-description-container-cart';
    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    const itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`;
    const itemSize = document.createElement('p');
    itemSize.textContent = item.size;
    itemDescriptionContainer.appendChild(itemName);
    itemDescriptionContainer.appendChild(itemPrice);
    itemDescriptionContainer.appendChild(itemSize);

    const itemRemoveContainer = document.createElement('div');
    itemRemoveContainer.id = 'item-remove-flex'
    const itemRemove = document.createElement('p');
    itemRemove.textContent = 'Remove item x';
    itemRemove.id = 'remove-' + item.id;
    itemRemove.addEventListener('click', () => {
        itemContainer.remove();
        shoppingCart.forEach((item, index) => {
            if(item.id === itemRemove.id[itemRemove.id.length - 1]){
                shoppingCart.splice(index, 1);
            }
        })
        if(shoppingCart.length === 0){
            document.getElementById('buy-button').remove();
            document.getElementById('cart').classList.add('hidden');
        }
    })
    itemRemoveContainer.appendChild(itemRemove);

    itemContainer.appendChild(itemImageContainer);
    itemContainer.appendChild(itemDescriptionContainer);
    itemContainer.appendChild(itemRemoveContainer);
    return itemContainer;
}

function createButton(){
    const cart = document.getElementById('cart');
    const button = document.createElement('button');
    button.id = 'buy-button';
    button.textContent = 'Confirm order';
    cart.appendChild(button);
}


function updateShoppingBag(product){
    if(shoppingCart.length === 0){
        createButton();
        makeOrder();
    }
    shoppingCart.push(product);
    const shoppingBagContainer = document.getElementById('cart');
    //const countItems = document.getElementById('count-items');
    //countItems.textContent = Number(countItems.textContent) + 1;
    let itemWallet = createItemWallet(product);
    shoppingBagContainer.insertBefore(itemWallet, document.getElementById('buy-button'));
}

function buildForm(){
    const forms = document.querySelectorAll('.size-form');

    forms.forEach(form => {
        const sizeButtons = form.querySelectorAll('.input-size');
        const hiddenSizeButton = form.querySelector('input[name="size"]');
        let product = null;

        sizeButtons.forEach(sizeButton => {
            sizeButton.addEventListener('click', (e) => {
                const isSelected = sizeButton.classList.contains('selected');

                sizeButtons.forEach(sizeButton => sizeButton.classList.remove('selected'));

                if(isSelected){
                    hiddenSizeButton.value = '';
                    product = null;
                }
                else {
                    sizeButton.classList.add('selected');
                    hiddenSizeButton.value = sizeButton.value;
                    let item = e.target.closest('.grid-item');
                    let srcImage = item.querySelector('img').src;
                    product = {
                    name: item.dataset.name,
                    id: item.id,
                    price: item.dataset.price,
                    size: hiddenSizeButton.value,
                    image: srcImage
                }
                }
            })
        })

        form.addEventListener('submit', (e) => {
            if(!hiddenSizeButton.value){
                e.preventDefault();
                return;
            }
            e.preventDefault();
            updateShoppingBag(product);
        })
    })
}

function makeOrder(){
    const button = document.getElementById('buy-button');
    function sendOrder(){
        const request = new XMLHttpRequest();

        request.addEventListener('load', () => {
            if(request.status === 200){
                orderReceivedPopup();
            }
        })
        request.open('post', '/order');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(shoppingCart));
    }
    button.addEventListener('click', sendOrder);
}

function orderReceivedPopup(){
    const popup = document.createElement('p');
    popup.textContent = 'Order received!';

    popup.style.position = 'absolute';
    popup.style.width = '200px';
    popup.style.top = '0';
    popup.style.left = '20px';
    popup.style.padding = '10px';
    popup.style.border = 'solid 1px #aaa';
    document.body.appendChild(popup);

    setTimeout(()=>{
        popup.remove();
    }, 2000);
}