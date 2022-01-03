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

// Bouton formulaire, fonction au clique pour récupérer les donnés du formulaire 

// let  confirmBtnForm = document.getElementById("order");
// console.log (confirmBtnForm);


// confirmBtnForm.addEventListener('click', () => {
//   let firstName = document.querySelectorAll("input[name = 'firstName']");
//   let lastName =  document.querySelectorAll("input[lastName = 'lastName']");
//   let address = document.querySelectorAll("input[address = 'address']");
//   let city = document.querySelectorAll("input[city = 'city']");
//   let email = document.querySelectorAll("input[email = 'email']");
//   // stocker les données dans le local storage
//   localStorage.setItem("firstName", document.querySelector("#firstName").value);
//   localStorage.setItem("lastName", document.querySelector("#lastName").value);
//   localStorage.setItem("address", document.querySelector("#address").value);
//   localStorage.setItem("city", document.querySelector("#city").value);
//   localStorage.setItem("email", document.querySelector("#email").value);

//   let contact = {
//     nom : [firstName],
//     prenom : [lastName],
//     adresse : [address],
//     ville : [city],
//     mail : [email],
//   } 
//   console.log(contact)
// });

const form = document.querySelector('.cart__order__form');
const prenom = document.getElementById('firstName');
const prenomErreur = document.getElementById('firstNameErrorMsg');
const nom = document.getElementById('lastName');
const nomErreur = document.getElementById('lastNameErrorMsg');
const adresse = document.getElementById('address');
const adresseErreur = document.getElementById('addressErrorMsg');
const ville = document.getElementById('city');
const villeErreur = document.getElementById('cityErrorMsg')
const mail = document.getElementById('email');
const mailErreur = document.getElementById('emailErrorMsg')
const msgErreur = document.querySelectorAll('.cart__order__form__question >  p')
const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const addressRegex = /^[A-Za-z0-9\s]{5,50}$/;
const cityRegex = /^[A-Za-z]{5,50}$/

form.addEventListener('submit', function(e){
  e.preventDefault();
  const prenomValue = prenom.value.trim();
  const nomValue = nom.value.trim();
  const adresseValue = adresse.value.trim();
  const villeValue = ville.value.trim();
  const mailValue = mail.value.trim();

  function checkInput (){
    if(mailValue.match(emailRegex)){
      mailErreur.innerText = "";
    }else{
      mailErreur.innerText = "Veuillez entrer une  adresse mail valide."
    }
    if(adresseValue.match(addressRegex)){
      adresseErreur.innerText="";
    }else{
      adresseErreur.innerText="Veuillez entrer une adresse valide."
    }
    if(villeValue.match(cityRegex)){
      villeErreur.innerText = "";
    }else{
      villeErreur.innerText = "Veuillez entrer un nom de ville correct."
    }
    if(prenomValue.length < 3 || prenomValue.length > 15){
      prenomErreur.innerText = "Le prénom doit contenir entre 3 et 15 caractères"
    }else if (prenomValue.length >= 3){
      prenomErreur.innerText = "";
    }
    if(nomValue.length < 3 || nomValue.length > 35){
      nomErreur.innerText = "Le nom doit contenir entre 3 et 15 caractères"
    }else if(nomValue.length >= 3){
      nomErreur.innerText = ""
    }
  }
  checkInput();

  function createObjectLocalStorage () {
    localStorage.setItem("Prénom", prenom.value);
    localStorage.setItem("Nom", nom.value);
    localStorage.setItem("Adresse", adresse.value);
    localStorage.setItem("Ville", ville.value);
    localStorage.setItem("Email", mail.value);

    let contact = {
      nom : [nom.value],
      prenom : [prenom.value],
      adresse : [adresse.value],
      ville : [ville.value],
      mail : [email.value],
    }
    const test = {
      localStorageProduct,
      contact,
    }

    console.log(test)

  }

  createObjectLocalStorage();

})
