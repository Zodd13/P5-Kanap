// localStorageProduct récupère les données du local storage
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// getCartItem cible cart__items dans le html
const getCartItem = document.getElementById('cart__items');

// SI données dans local storage strictement égal à nul alors on affiche que le panier est vide
if(localStorageProduct === null){
    document.querySelector("h1").innerHTML = `Votre panier est vide`
}else{
  // Sinon on créer une variable fullCart contenant un tableau vide et une boucle for.
    let fullCart = [];
    let totalCart = 0;
    let totalFullCart = 0;
    // tant que i est plus petit que localStorageProduct.length on incrémente
    for(i = 0; i < localStorageProduct.length; i++){
    totalFullCart += parseInt (localStorageProduct[i].nombreDeProduit,10)
    totalCart += localStorageProduct[i].nombreDeProduit*localStorageProduct[i].prixDuProduit
    fullCart = fullCart + `
    <article class="cart__item" data-id=${localStorageProduct[i].idDuProduit} data-color="${localStorageProduct[i].couleurDuProduit}">
                <div class="cart__item__img">
                  <img src="${localStorageProduct[i].imageDuProduit}" alt="${localStorageProduct[i].textAlternatif}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${localStorageProduct[i].nomDuProduit}</h2>
                    <p>${localStorageProduct[i].descriptionDuProduit}</p>
                    <p>${localStorageProduct[i].couleurDuProduit}</p>
                    <p>${localStorageProduct[i].prixDuProduit} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantité</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProduct[i].nombreDeProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
    }
    // si i strictement égal à localStorageProduct.length on affiche la page html
    if(i===localStorageProduct.length){
    getCartItem.innerHTML = fullCart
    }
    const targetPrice = document.getElementById('totalPrice')
    const targetQuantity = document.getElementById('totalQuantity')
    targetPrice.innerHTML = totalCart
    targetQuantity.innerHTML = totalFullCart
}
