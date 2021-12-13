

// déclaration fonction async + const itemId qui retourne les différentes ID
(async function () {
    const itemId = getItemId();
    const item = await getItem(itemId);
    hydrateItem(item);
})();

function getItemId() {
    return new URL(location.href).searchParams.get("id")  
}

function getItem(itemId){
    return fetch(`http://localhost:3000/api/products/${itemId}`)
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(product){
        return product
    })
    .catch (function(error){
        alert('Erreur de chargement des produits')
    })
}

function hydrateItem(item){  
    document.getElementsByTagName('title')[0].innerHTML = `${item.name}`
    document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`
    document.getElementById('title').textContent = `${item.name}`
    document.getElementById('price').textContent = `${item.price}`
    document.getElementById('description').textContent = `${item.description}`
    let select = document.getElementById('colors')
    item.colors.forEach(color => {
        let createOption = document.createElement('option');
        select.appendChild(createOption)
        createOption.innerHTML = `${color}`;
        createOption.value =`${color}`;
    });
};