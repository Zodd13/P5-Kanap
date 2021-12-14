// Appel de la fonction main contenant le code de base

main ()

// fonction contenant nos articles

async function main() {
    const products = await getProducts()

    for (product of products){
        showProduct(product)
    }
}

// la fonction getProducts récupère les données depuis l'api grâce à un fetch

function getProducts() {
    return fetch("http://localhost:3000/api/products")
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

// fonction showProduct affiche le résultat de la requête sous forme de carte
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

