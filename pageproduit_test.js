
//////////////////
// PAGE PRODUIT //
//////////////////
console.log("ca fonctionne")
let product = null;
let categorie = "";

const queryString = window.location.search; //récupère infos de l'url
const urlParams = new URLSearchParams(queryString); //objet qui represente paramètre url
const productId = urlParams.get("id"); //récupère la valeur d'un paramètre



function findProduct(url, textOption, option) {

  fetch("http://localhost:3000/api/"+url)
  .then((resp) => resp.json())
  .then(function (products) {

//code pour demander à l'API le produit à afficher

    products.forEach((item) => {
      if (productId == item._id) {
        categorie = url;
        const classDisplayCart = undisplayCartButton();
        const classDisplayText = classDisplayCart ? "" : "d-none";
        product = item;
        const html1 = `
        <div class="col-md-7">
          <h2 class="featurette-heading">${item.name}</h2>
          
          <p class="lead">${item.description}</p>
          <p class="lead">${item.price / 100}€</p>
          
          <div class="col-md-5">
            <label for="couleur" class="form-label">${textOption}</label>
            <select class="form-select" id="property" required>
              <option value="">${textOption}</option>
              ${item[option].map(itemOption => `<option>${itemOption}</option>`).join("")}
            </select>
            <div class="invalid-feedback">
              Veuillez choisir une option.
            </div>
            <a class="btn my-2 add-cart ${classDisplayCart}">Ajouter au panier</a>
            <p class="${classDisplayText}">Vous avez déjà ajouté un produit d'une autre catégorie.</p>
            <a href="panier.html" class="btn my-2">Voir mon panier</a>
          </div>
        
        </div>
        <div class="col-md-5">
          <img id="imageUrl" class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src="${item.imageUrl}"/>
        </div>
    
        <hr class="featurette-divider">
      </div>`

        const article = document.querySelector('#article');
        article.innerHTML += html1;
      }
    }
    )
  }
  )
}

findProduct("teddies", "couleur", "colors");
findProduct("furniture", "vernis", "varnish");
findProduct("cameras", "lentilles", "lenses");




//le panier s'affiche correctement même si page rafraîchie
function chargementDuPanier () {
  let nombreDeProduits = localStorage.getItem('nombre_articles_ajoutes');

  if (nombreDeProduits) {
      document.querySelector('.panier span').innerHTML = nombreDeProduits;
  }
}

// mettre des articles dans le panier et savoir combien il y en a
function ajoutAuPanier () {
  let nombreDeProduits = localStorage.getItem('nombre_articles_ajoutes');

  nombreDeProduits = parseInt(nombreDeProduits);

  if (nombreDeProduits) {
      localStorage.setItem('nombre_articles_ajoutes', nombreDeProduits + 1);
      document.querySelector('.panier span').innerHTML = nombreDeProduits + 1;
  } else {
      localStorage.setItem('nombre_articles_ajoutes', 1);
      document.querySelector('.panier span').innerHTML = 1;
  }
  definieArticle();
}

// mettre un article dans le panier et savoir ce que c'est

function definieArticle() {
  localStorage.setItem("categorie", categorie);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product._id] == undefined) {
      cartItems = {
        ...cartItems,
        [product._id]: [{
          property: document.querySelector('#property').value,
          quantity: 1,
          product : product,
          name : name,
        }],
      }
    } else {
      const property = document.querySelector('#property').value
      let property_updated = false;
      cartItems[product._id].forEach((item) => {
        if (item.property == property) {
          item.quantity += 1;
          property_updated = true;
        }
      })
      if (property_updated == false) {
        cartItems[product._id] = [
          ...cartItems[product._id],
          {
            property: property,
            quantity: 1,
            product : product
          },
        ]
      }
    }
  } else {
    cartItems = {
      [product._id]: [{
        property: document.querySelector('#property').value,
        quantity: 1,
        product : product
      }],
    }
  }
  console.log(cartItems);
  console.log(product);
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  //window.location.href = 'panier.html';
}

document.addEventListener('click', function (event) {
  //event.preventDefault();
  const element = event.target;
  if (element.tagName == 'A' && element.classList.contains("add-cart")) {
    //definieArticle();
    ajoutAuPanier();
    totalCost();
  }
});


function totalCost(){
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", product.price + cartCost);
  } else {
      localStorage.setItem("totalCost", product.price);
  }
}

// PAGE PANIER

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let nombreDeProduits= 0;
  cartItems = JSON.parse(cartItems);
  let productsContainer = document.querySelector(".products")
  if (cartItems && productsContainer) {
      productsContainer.innerHTML = '';
      Object.values(cartItems).map( declinaisons  => {
        Object.values(declinaisons).map( item  => {
          
          nombreDeProduits += item.quantity;
          

          productsContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="w-25 my-0 product-name">${item.product.name}</h6>
                <small class="w-25 text-muted product-option">option: ${item.property}</small>
              </div>
              <span class="w-25 text-center text-muted product-price">${item.quantity}</span>
              <span class="w-25 text-center text-muted product-price">${item.product.price / 100}€</span>
              <span class="w-25 text-center text-muted product-price">${item.product.price / 100 * item.quantity}€</span>
            </li>
          `
        })
      })

      let cartCost = localStorage.getItem("totalCost");
      document.querySelector(".total").innerHTML = parseInt(cartCost)/100 + ",00€";
      document.querySelector(".nombre_article").innerHTML = nombreDeProduits;
  } 
}

function undisplayCartButton() {
  const categorieCart = localStorage.getItem("categorie");
  if (categorieCart != null && categorieCart != categorie) {
    return "d-none";
  }
  return "";
}

chargementDuPanier();
displayCart();