// localStorageProduct récupère les données du local storage
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// getCartItem cible cart__items dans le html
const getCartItem = document.getElementById('cart__items');

function addProductToCart() {
  let fullCart = [];
  let totalCart = 0;
  let totalFullCart = 0;
  const userHashMap = {}
  localStorageProduct = localStorageProduct.filter ((item, _)=>{
    let alreadyExists = userHashMap.hasOwnProperty(item.couleurDuProduit)
    return alreadyExists? false : userHashMap[item.couleurDuProduit] = 1
  })
  // tant que i est plus petit que localStorageProduct.length on incrémente
  for(i = 0; i < localStorageProduct.length; i++){
  totalFullCart += parseInt (localStorageProduct[i].nombreDeProduit,10)
  totalCart += localStorageProduct[i].nombreDeProduit*localStorageProduct[i].prixDuProduit
  fullCart = getCartItem.innerHTML = fullCart + `
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
            `;}
  const targetPrice = document.getElementById('totalPrice')
  const targetQuantity = document.getElementById('totalQuantity')
  targetPrice.innerHTML = totalCart
  targetQuantity.innerHTML = totalFullCart
};

addProductToCart ();

function listenDeleteButton(params) {
  const deleteButton = document.querySelectorAll('.deleteItem')
  for(i = 0; i < deleteButton.length; i++){
    deleteButton[i].addEventListener('click', function (params) {
      console.log('cliqué')
      let idDuProduitSuppression = localStorageProduct[i].idDuProduit
      localStorageProduct = localStorageProduct.filter (el => el.idDuProduit == idDuProduitSuppression)
      console.log(localStorageProduct)
    })
  }
}

listenDeleteButton();