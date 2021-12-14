// récupère les données du local storage 
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// cible la section cart__items dans la page cart.html
const getCartItem = document.getElementById('cart__items');

if(localStorageProduct === null){
    document.querySelector("h1").innerHTML = `Votre panier est vide`
}else{
    let fullCart = [];
    for(i = 0; i < localStorageProduct.length; i++){

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
    if(i===localStorageProduct.length){
    getCartItem.innerHTML = fullCart
    }
}
