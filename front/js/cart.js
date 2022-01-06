// localStorageProduct récupère les données du local storage et les transforme en format JSON.
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// getCartItem cible cart__items dans le html
const getCartItem = document.getElementById('cart__items');

// submitBtn cible le bouton commander.
const submitBtn = document.querySelector("#order");

// Fonction qui ajoute les produits dans le panier avec le HTML.
function addProductToCart() {
  // fullCart est un tableau vide du panier.
  let fullCart = [];
  // Initialisation des variables pour le prix total du panier.
  let totalCart = 0;
  let totalFullCart = 0;

  // UserHashMap filtre les doublons de produits ayant la même couleur.
  const userHashMap = {}
  localStorageProduct = localStorageProduct.filter ((item, _)=>{
    let alreadyExists = userHashMap.hasOwnProperty(item.couleurDuProduit)
    return alreadyExists? false : userHashMap[item.couleurDuProduit] = 1
  })

  // Boucle qui ajoute les produits tant qu'il y en a dans le local storage.
  // totalFullCart & totalCart font le calcul des produits du panier
  for(i = 0; i < localStorageProduct.length; i++){
  // Calcul du prix dans le panier.
  totalFullCart += parseInt (localStorageProduct[i].nombreDeProduit,10)
  // totalCart (valeur 0) est multiplié par le nombreDeProduit et le prixDuProduit, pour obtenir le prix total.
  totalCart += localStorageProduct[i].nombreDeProduit*localStorageProduct[i].prixDuProduit
  // On injecte ensuite le tout  dans le HTML via la méthode innerHTML.
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
  // On injecte le résultat du prix et de la quantité dans le HTML.
  const targetPrice = document.getElementById('totalPrice')
  const targetQuantity = document.getElementById('totalQuantity')
  targetPrice.innerHTML = totalCart
  targetQuantity.innerHTML = totalFullCart
};

addProductToCart ();

// Fonction permettant de supprimer les produits du panier.
function deleteItemProduct(){
  // Cible le bouton supprimer.
  const deleteButton = document.querySelectorAll('.cart__item__content__settings__delete > .deleteItem');
  
  // Boucle dans le local storage et ajoute un évènement au clique pour supprimer les produits au clique via l'addEventListener "click".
  for (let i = 0; i < localStorageProduct.length; i ++){
    deleteButton[i].addEventListener('click', (e) => {
      e.preventDefault();
      // Ces deux variables permettent de supprimer un objet via son ID et sa couleur.
      let supprimerId = localStorageProduct[i].idDuProduit;
      let supprimerCouleur = localStorageProduct[i].couleurDuProduit;

      // Filtre les objets n'ayant pas la même ID ou même couleur que l'élément cliqué
      localStorageProduct = localStorageProduct.filter(el => el.idDuProduit !== supprimerId || el.couleurDuProduit !== supprimerCouleur )
      
      // Effectue les modifications dans le local storage en transformant en chaine de caractère grâce à stringify.
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
  // targetQty cible l'input .itemQuantity via la méthode de querySelectorAll qui permet de séléctionné autant d'input qu'il y en a sur la page.
  const targetQty = document.querySelectorAll('.itemQuantity')
  // Boucle dans les inputs pour détécté un changement dans l'input. Si il y a un changement, alors la fonction se lance.
    for (let i = 0; i < targetQty.length; i++){
        targetQty[i].addEventListener('input', function(){
        // changeQty récupère la value de l'input.
        let changeQty = targetQty[i].value;
        // Transmet la valeur  de l'input dans le le localStorage
        localStorageProduct[i].nombreDeProduit = changeQty;
        // Applique les changement dans le local storage.
        localStorage.setItem("product", JSON.stringify(localStorageProduct));
        // Recharge la page afin de voir les changements.
        location.reload();
      });
    };
};

changeQty();

// Regex pour validation formulaire.

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const addressRegex = /^[A-Za-z0-9\s]{5,50}$/;
const cityRegex = /^[A-Za-z\s]{5,50}$/

// submitForm envoi le formulaire.
function submitForm (e){
  // e.preventDefault(); permet d'éviter le comportement par defaut.
  e.preventDefault();
  // Initialisation variable check à true, afin  de vérifier si l'utilisation à bien rempli le formulaire.
  let check = true;

  // fonction checkInput qui permet de verifier les regex, avec des conditions dans le cas ou l'input ne serait pas correct on affiche un message d'erreur.
  function checkInput (){
  // On cible tous les éléments dont on auras besoin.
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
  const prenomValue = prenom.value.trim();
  const nomValue = nom.value.trim();
  const adresseValue = adresse.value.trim();
  const villeValue = ville.value.trim();
  const mailValue = mail.value.trim();
  // On applique les regex via .match et des conditions if / else.
    if(mailValue.match(emailRegex)){
      mailErreur.innerText = "";
    }else{
      check = false;
      mailErreur.innerText = "Veuillez entrer une  adresse mail valide."
    }
    if(adresseValue.match(addressRegex)){
      adresseErreur.innerText="";
    }else{
      check = false;
      adresseErreur.innerText="Veuillez entrer une adresse valide."
    }
    if(villeValue.match(cityRegex)){
      villeErreur.innerText = "";
    }else{
      check = false;
      villeErreur.innerText = "Veuillez entrer un nom de ville correct."
    }
    if(prenomValue.length < 3 || prenomValue.length > 15){
      check = false;
      prenomErreur.innerText = "Le prénom doit contenir entre 3 et 15 caractères"
    }else if (prenomValue.length >= 3){
      prenomErreur.innerText = "";
    }
    if(nomValue.length < 3 || nomValue.length > 35){
      check = false;
      nomErreur.innerText = "Le nom doit contenir entre 3 et 15 caractères"
    }else if(nomValue.length >= 3){
      nomErreur.innerText = ""
    }
  }
  
  checkInput();

// Fonction postApi qui va permet de vérifier si check === true on envoit le formulaire.
  function postApi(){
    if(check === true){

      if(localStorageProduct.length === 0){
        alert ("Please select a product")
        return
      }
    // La constante body récupère le tableau contact défini plus bas dans la fonction requestBody().
      const body = requestBody();
      
    // Fetch l'api cette fois ci avec une méthode POST qui permet d'envoyer les données au serveur.
      fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type" : "application/json",
        }
      })
    
      .then((res) => res.json())
    
      .then((data) => {
        const orderId = data.orderId
        // nous envoi sur la page confirmation. Attention, si les inputs ne sont pas remplis correctement (voir variable check) ça nous enverras pas sur la page confirmation.
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
        return console.log(data)
      })
      // On catch si il y a une erreur.
      .catch((error) => console.log(error))
    }
  }
  
  postApi();

  // requestBody récupère les valeurs entrées dans les inputs. Boucle à l'interieur et donne à la variable idProducts, les id du produit.
  // On créer aussi l'objet contact dans lequel on entre les données des inputs, et enfin un products avec l'id des produits récupérer dans la boucle.
  // On a besoin de toutes ces données la pour effectués notre POST. Sinon ça ne marcheras pas.
  function requestBody(){
    const firstNameInput = document.querySelector('#firstName')
    const firstName = firstNameInput.value
  
    const lastNameInput = document.querySelector('#lastName')
    const lastName = lastNameInput.value
  
    const addressInput = document.querySelector('#address')
    const address = addressInput.value
  
    const cityInput = document.querySelector('#city')
    const city = cityInput.value
  
    const emailInput = document.querySelector('#email')
    const email = emailInput.value
  
    let idProducts  = [];
    for (let i = 0; i < localStorageProduct.length; i++) {
    
      idProducts.push(localStorageProduct[i].idDuProduit)
  
    }
  
    const body = { 
      contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products : idProducts,
    }
    return body
  }
}

// Pour finir on appel la fonction.
submitBtn.addEventListener("click", (e) => submitForm(e))
  
