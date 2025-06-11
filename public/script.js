const container = document.getElementById('container');
const shoppingCartContainer = document.getElementById('shopping-cart');
const gridContainer = document.createElement('div');
gridContainer.className = 'grid-container';

let lastResponse = null;

function getInventory(){
    const request = new XMLHttpRequest();
    function getData(){
        if(request.status === 200){
            let response = JSON.parse(request.responseText);
            if(response){
                createFilter(response);
                createGrid(response);
                buildForm();
                lastResponse = response;
            }
        }
    }
    request.addEventListener('load', getData);
    request.open('get', '/inventory');
    request.send();
}

function filterBy(filter){
    gridContainer.innerHTML = "";
    createGrid(lastResponse, filter);
    buildForm();
    if(gridContainer.innerHTML === ""){
        gridContainer.innerHTML = 'Nessun risultato trovato';
    }
}

function createFilter(items){
    if(document.getElementById('filter-container')) return;
    const filterContainer = document.createElement('div');
    filterContainer.id = 'filter-container';

    function createColorSection(){
        const colorSection = document.createElement('div');
        colorSection.className = 'filter-item';
        colorSection.id = 'color-section';

        let p = document.createElement('p');
        p.textContent = 'Color';
        colorSection.appendChild(p);

        const colors = document.createElement('div');
        colors.className = 'colors';
        let colorsResult = [];
        for(let i = 0; i < items.length; i++){
            if(!(colorsResult.includes(items[i].color))){
                colorsResult.push(items[i].color);
            }
        }
        for(let i of colorsResult){
            let color = document.createElement('div');
            color.id = i;
            color.style.backgroundColor = i;
            color.className = 'colors-item';
            color.addEventListener('click', (e) => filterBy(['color', e.target.id]));
            colors.appendChild(color);
        }
        colorSection.appendChild(colors);
        filterContainer.appendChild(colorSection);
    }

    function createSizeSection(){
        const sizeSection = document.createElement('div');
        sizeSection.className = 'filter-item';
        sizeSection.id = 'size-section';

        let p = document.createElement('p');
        p.textContent = 'Size';
        sizeSection.appendChild(p);

        const sizes = document.createElement('div');
        sizes.className = 'sizes';
        let sizesList = ['XS', 'S', 'M', 'L', 'XL'];
        for(let i of sizesList){
            let size = document.createElement('div');
            size.id = i;
            size.classList = 'sizes-item';
            size.textContent = i;
            size.addEventListener('click', (e) => {filterBy(['size', e.target.id])})
            sizes.appendChild(size);
        }
        sizeSection.appendChild(sizes);
        filterContainer.appendChild(sizeSection);
    }

    function createTypeSection(){
        const typeSection = document.createElement('div');
        typeSection.className = 'filter-item';
        typeSection.id = 'type-section';

        let p = document.createElement('p');
        p.textContent = 'Type';
        typeSection.appendChild(p);

        const typeSelect = document.createElement('select');
        typeSelect.className = 'types';
        typeSelect.addEventListener('change', (e) => {filterBy(['type', e.target.value])});
        let typeResult = ['all'];
        for(let i = 0; i < items.length; i++){
            if(!(typeResult.includes(items[i].category))){
                typeResult.push(items[i].category);
            }
        }
        for(let i of typeResult){
            let typeOption = document.createElement('option');
            typeOption.className = 'types-item';
            typeOption.id = i;
            typeOption.textContent = i;

            typeSelect.appendChild(typeOption);
        }

        typeSection.appendChild(typeSelect);
        filterContainer.appendChild(typeSection);
    }
    createColorSection();
    createSizeSection();
    createTypeSection();
    container.appendChild(filterContainer);
}

function createItemContainer(item){
    const itemContainer = document.createElement('div');
    itemContainer.id = item.id;
    itemContainer.className = 'grid-item';
    itemContainer.dataset.name = item.name;
    itemContainer.dataset.price = item.price;

    const itemImageContainer = document.createElement('div');
    itemImageContainer.className = 'img-container';
    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImageContainer.appendChild(itemImage);

    const itemDescriptionContainer = document.createElement('div');
    itemDescriptionContainer.className = 'item-description-container';
    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    const itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`;
    
    const itemForm = document.createElement('form');
    itemForm.className = 'size-form';
    for(let i = 0; i < item.size.length ; i++){
        let inputSize = document.createElement('input');
        inputSize.className = 'input-size';
        inputSize.type = 'button';
        inputSize.value = item.size[i];
        itemForm.appendChild(inputSize);
    }
    let hiddenInputSize = document.createElement('input');
    hiddenInputSize.type = 'hidden';
    hiddenInputSize.name = 'size';
    itemForm.appendChild(hiddenInputSize);
    const itemButton = document.createElement('button');
    itemButton.textContent = 'Add to shopping cart';
    itemButton.type = 'submit';
    itemForm.appendChild(itemButton);

    itemDescriptionContainer.appendChild(itemName);
    itemDescriptionContainer.appendChild(itemPrice);
    itemDescriptionContainer.appendChild(itemForm);

    itemContainer.appendChild(itemImageContainer);
    itemContainer.appendChild(itemDescriptionContainer);
    
    gridContainer.appendChild(itemContainer);
}

function createGrid(items, filter){
    items.forEach(item => {
        if(filter === undefined){
            createItemContainer(item);
        }
        else if (filter[0] === 'color'){
            if(filter[1] === item.color){
                createItemContainer(item);
            }
        }
        else if (filter[0] === 'type'){
            if(filter[1] === item.category || filter[1] === 'all'){
                createItemContainer(item);
            }
        }
        else if (filter[0] === 'size'){
            if(item.size.includes(filter[1])){
                createItemContainer(item);
            }
        }
        else {
            createItemContainer(item);
        }
    })

    if(!container.contains(gridContainer))
    {
        container.appendChild(gridContainer);
    }
}

getInventory();