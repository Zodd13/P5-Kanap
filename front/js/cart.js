// localStorageProduct récupère les données du local storage
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// getCartItem cible cart__items dans le html
const getCartItem = document.getElementById('cart__items');

// Fonction qui ajoute les produits dans le panier avec le HTML

function addProductToCart() {
  let fullCart = [];
  let totalCart = 0;
  let totalFullCart = 0;

  // UserHashMap filtre les doublons de produits ayant la même couleur
  const userHashMap = {}
  localStorageProduct = localStorageProduct.filter ((item, _)=>{
    let alreadyExists = userHashMap.hasOwnProperty(item.couleurDuProduit)
    return alreadyExists? false : userHashMap[item.couleurDuProduit] = 1
  })

  // Boucle qui ajoute les produits tant qu'il y en a dans le local storage
  // totalFullCart & totalCart font le calcul des produits du panier
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

// Fonction permettant de supprimer les produits du panier
function deleteItemProduct(){
  const deleteButton = document.querySelectorAll('.cart__item__content__settings__delete > .deleteItem');
  
  // Boucle dans le local storage et ajoute un évènement au clique pour supprimer les produits séléctionnés

  for (let i = 0; i < localStorageProduct.length; i ++){
    deleteButton[i].addEventListener('click', (e) => {
      e.preventDefault();

      let supprimerId = localStorageProduct[i].idDuProduit;
      let supprimerCouleur = localStorageProduct[i].couleurDuProduit;

      // Filtre les produits n'ayant pas la même ID ou même couleur que l'élément cliqué
      localStorageProduct = localStorageProduct.filter(el => el.idDuProduit !== supprimerId || el.couleurDuProduit !== supprimerCouleur )
      
      // Effectue les modification dans le local storage en transformant en chaine de caractère grâce à stringify
      localStorage.setItem("product",JSON.stringify(localStorageProduct));
      
      // Pop-up alerte indiquant à l'usager que le produit séléctionné a bien été supprimer
      alert('Cette élement a bien été supprimer du panier');

      // Rechargement de la page pour prendre en compte les modifications
      location.reload();
    })
  }
}
// Appel de la fonction deleteItemProduct
deleteItemProduct();

// Fonction permettant de changer de quantité dans le panier
function changeQty (){
  const targetQty = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < targetQty.length; i++){
        targetQty[i].addEventListener('input', function(){
        let valueInStorage = localStorageProduct[i].nombreDeProduit;
        let changeQty = targetQty[i].value;
        let colorProduct = localStorageProduct[i].couleurDuProduit;
        
        const newValue = localStorageProduct.find((el) => el.changeQty !== valueInStorage || el.changeQty === colorProduct) //!\\ Si on prends un canapé même ID mais couleur différent le deuxième modifie les quantité du premier canapé !!
        // Valeur à insérer dans local storage = valeur indiqué dans l'input
        newValue.nombreDeProduit = changeQty;
        // Modifie la valeur de nombreDeProduit par la nouvelle valeur de l'input
        localStorageProduct[i].nombreDeProduit = newValue.nombreDeProduit;

        localStorage.setItem("product", JSON.stringify(localStorageProduct));
        location.reload();
        console.log(changeQty)
      });
    };
};

changeQty();