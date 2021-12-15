// Appel de la fonction main

main ()

// Fonction async main () contient la promesse et la boucle pour afficher les produits sur la page d'accueil

async function main() {
    const products = await getProducts()
    for (product of products){
        showProduct(product)
    }
}

// la fonction getProducts récupère les données depuis l'api grâce à un fetch

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

// fonction showProduct affiche le html sur la page d'accueil
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

