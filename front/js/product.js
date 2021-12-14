
// déclaration fonction async + const itemId qui retourne les différentes ID

(async function () {
    const itemId = getItemId();
    const item = await getItem(itemId);
    hydrateItem(item);
    const targetButton = document.getElementById('addToCart');
    const targetQuantity = document.getElementById('quantity');

    // Ajout du listener sur le bouton "Confirmer" afin de sauvegarder les données de l'utilisateur dans le local storage

    targetButton.addEventListener('click', (event) =>{
        event.preventDefault();

        // Les données de l'objet JS sont stockées dans la constante itemProduct

        const itemProduct = {
            nomDuProduit : item.name,
            couleurDuProduit : colors.value,
            descriptionDuProduit : item.description,
            prixDuProduit : item.price,
            nombreDeProduit : targetQuantity.value,
        };

        // La variable localStorageProduct va stockées les key et les values du local storage
        // JSON.parse permet de traduire les données du local storage en objet JS (initialement en JSON)

        let localStorageProduct = JSON.parse(localStorage.getItem("product"));

        // Fonction cartConfirm qui va afficher une fenêtre de confirmation à l'écran, si ok redirige vers le panier, si annuler renvoi à l'index.

        const cartConfirm = () => {
            if(window.confirm(`${itemProduct.nomDuProduit} couleur ${itemProduct.couleurDuProduit} a bien été ajouté au panier.
            `)){
                window.location.href = "cart.html"
            }else{
                window.location.href = "index.html"
            }
        }

        
        // Fonction storageProduct ajoute l'objet séléctionner dans le local storage
        const storageProduct = () =>{
            // push les données dans le tableau
            localStorageProduct.push(itemProduct)
            // localStorage.setItem transforme et envoi les données dans la key Product du localStorage
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
        }

        if(localStorageProduct){
            storageProduct()
            cartConfirm()
        }else{
            localStorageProduct = [];
            storageProduct()
            cartConfirm()
        };
    })
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

// la fonction hydrateItem ajoute les éléments HTML dynamiquement

function hydrateItem(item){  
    document.getElementsByTagName('title')[0].innerHTML = `${item.name}`
    document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`
    document.getElementById('title').textContent = `${item.name}`
    document.getElementById('price').textContent = `${item.price}`
    document.getElementById('description').textContent = `${item.description}`
    let select = document.getElementById('colors')

    // La boucle forEach qui affiche les couleurs de canapés
     
    item.colors.forEach(color => {
        let createOption = document.createElement('option');
        select.appendChild(createOption)
        createOption.innerHTML = `${color}`;
        createOption.value =`${color}`;
    });
}