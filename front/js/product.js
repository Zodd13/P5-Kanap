// Fonction asynchrone qui permet d'ajouter un objet au panier dans le local storage.

(async function addProductInCart() {
    // Récupère l'ID de l'objet.
    const itemId = getItemId();
    // Récupère l'objet via méthode GET avec son ID pour paramètre.
    const item = await getItem(itemId);
    // Fonction showItems, qui affiche l'objet prends pour paramètre Item qui correspond à l'objet et son ID.
    showItems(item);
    // Récupère le bouton "addToCart".
    const targetButton = document.getElementById('addToCart');
    // Récupère l'input 'quantity'.
    const targetQuantity = document.getElementById('quantity');

    // Listener sur le clique, du bouton "addToCart", récupère les différentes données des produits.

    targetButton.addEventListener('click', (event) =>{
        event.preventDefault();

        // Les données de l'objet JS sont stockées dans la constante itemProduct.

        const itemProduct = {
            textAlternatif : item.altTxt,
            idDuProduit : item._id,
            imageDuProduit : item.imageUrl,
            nomDuProduit : item.name,
            couleurDuProduit : colors.value,
            descriptionDuProduit : item.description,
            prixDuProduit : item.price,
            nombreDeProduit : targetQuantity.value,
        };

        // La variable localStorageProduct va stockées les key et les values du local storage. On utilise parse pour transformer en JSON.
        // La méthode JSON.parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.

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

        // Fonction storageProduct va envoyer les données contenu dans la constante itemProduct dans le localStorage.
        const storageProduct = () =>{
            // On envoi les données dans itemProduct, puis on les ajoute au localStorage.
            localStorageProduct.push(itemProduct)
            // La méthode setItem permet d'ajouter dans le local storage un objet contenant un duo clé - valeur.
            // JSON.stringify permet de convertir une valeur JavaScript en chaine JSON.
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
        }
        // Si OK alors on va au panier, sinon retourne à l'index.
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

// fonction permettant  de récupérer l'id du produit dans l'URL.
function getItemId() {
    return new URL(location.href).searchParams.get("id")  
}
// Fonction récupère l'ID de l'objet dans l'api.
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

// la fonction showItems ajoute les éléments HTML dynamiquement

function showItems(item){  
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