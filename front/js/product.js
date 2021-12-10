(async function () {
    const itemId = getItemId()
    console.log(itemId)
    const item = await getItem(itemId)
    console.log(item)
    hydrateItem(item)
})()

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
    document.getElementsByClassName('item__img');
    for (var i = 0; i < item.length; i += i++){
        item[i].src = `${item.imageUrl}`;
    }
    document.getElementById('title').textContent = `${item.name}`
    document.getElementById('price').textContent = `${item.price}`
    document.getElementById('description').textContent = `${item.description}`
    document.getElementById('colors').innerHTML += `
    <option value="${item.colors}">${item.colors[0]}</option>
    <option value="${item.colors}">${item.colors[1]}</option>
    <option value="${item.colors}">${item.colors[2]}</option>
    `
}