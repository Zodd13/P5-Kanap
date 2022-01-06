// Appel de la fonction main

main ()

// Fonction asynchrone main(), récupère la réponse de  la fonction getProducts dans la const products, puis lance  une boucle pour afficher
// les produits dans la page d'acceuil.

async function main() {
    const products = await getProducts()
    for (product of products){
        showProduct(product)
    }
}

// Fetch de l'API avec une méthode GET pour récupérer les données de l'API dans la fonction getProducts ();

function getProducts() {
    return fetch("http://localhost:3000/api/products")
    // Reponse de l'api sous format JSON
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(product){
            return product
        })
        // Si il y a une erreur on affichera alors ce message à l'écran
        .catch (function(error){
            alert('Erreur de chargement des produits')
        })
}

// La fonction showProduct(), affiche les données sous forme de html.

function showProduct(){
    document.getElementById('items').innerHTML += `
    <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
}

