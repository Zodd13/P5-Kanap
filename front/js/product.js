const dataApi = fetch("http://localhost:3000/api/products");

dataApi.then(async (responseData) => {
    console.log(responseData);

    const response = await responseData.json();
    console.log(response);

    try{
        const imageUrl = response[0].imageUrl
        const id = response[0]._id
        const itemImage = document.querySelectorAll("item__img")
        console.log(itemImage)
        let colors = [colorsItem]
        console.log(colors)
    }catch (err){

    }
});

(async function () {
    const itemId = getItemId()

    const item = await getItem(itemId)

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

    
    document.getElementById('item__img').innerHTML = `<img src="${item.imageUrl}" alt="Photographie d'un canapé">`
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