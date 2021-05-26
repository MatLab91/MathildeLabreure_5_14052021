
//////////////////
// PAGE PRODUIT //
//////////////////

let product = null;

const queryString = window.location.search; //récupère infos de l'url
const urlParams = new URLSearchParams(queryString); //objet qui represente paramètre url
const productId = urlParams.get("id"); //récupère la valeur d'un paramètre

// NOUNOURS

fetch("http://localhost:3000/api/teddies")
  .then((resp) => resp.json())
  .then(function (products) {


    //code pour choisir le bon article de l'API

    products.forEach((item) => {
      if (productId == item._id) {
        product = item;
        const html1 = `
        <div class="col-md-7">
          <h2 class="featurette-heading">${item.name}</h2>
          
          <p class="lead">${item.description}</p>
          <p class="lead">${item.price / 100}€</p>
          
          <div class="col-md-5">
            <label for="couleur" class="form-label">Couleur</label>
            <select class="form-select" id="property" required>
              <option value="">Couleur</option>
              ${item.colors.map(color => `<option>${color}</option>`).join("")}
            </select>
            <div class="invalid-feedback">
              Veuillez choisir une couleur.
            </div>
            <a class="btn my-2 add-cart">Ajouter au panier</a>
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

// MEUBLES EN CHÊNE

fetch("http://localhost:3000/api/furniture")
  .then((resp) => resp.json())
  .then(function (products) {

    //code pour choisir le bon article de l'API

    products.forEach((item) => {
      if (productId == item._id) {
        product = item;
        const html1 = `
        <div class="col-md-7">
          <h2 class="featurette-heading">${item.name}</h2>
          <p class="lead">${item.description}</p>
          <p class="lead">${item.price / 100}€</p>
          <p class="lead id-article" id="_id" ${item._id}></p>
          <div class="col-md-5">
            <label for="vernis" class="form-label">Vernis</label>
            <select class="form-select" id="property" required>
              <option value="">Vernis</option>
              ${item.varnish.map(varnish => `<option>${varnish}</option>`).join("")}
            </select>
            <div class="invalid-feedback">
              Veuillez choisir une couleur.
            </div>
            <a class="btn my-2 add-cart">Ajouter au panier</a>
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


// CAMÉRAS VINTAGE

fetch("http://localhost:3000/api/cameras")
  .then((resp) => resp.json())
  .then(function (products) {

    //code pour choisir le bon article de l'API

    products.forEach((item) => {
      if (productId == item._id) {
        product = item;
        const html1 = `
        <div class="col-md-7">
          <h2 class="featurette-heading">${item.name}</h2>
          <p class="lead">${item.description}</p>
          <p class="lead">${item.price / 100}€</p>
          <p class="lead id-article" id="_id" ${item._id}></p>
          <div class="col-md-5">
            <label for="lentilles" class="form-label">Lentilles</label>
            <select class="form-select" id="property" required>
              <option value="">Lentilles</option>
              ${item.lenses.map(lense => `<option>${lense}</option>`).join("")}
            </select>
            <div class="invalid-feedback">
              Veuillez choisir une couleur.
            </div>
            <a class="btn my-2 add-cart">Ajouter au panier</a>
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


// mettre un article dans le panier

function addToCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product._id] == undefined) {
      cartItems = {
        ...cartItems,
        [product._id]: [{
          property: document.querySelector('#property').value,
          quantity: 1,
          product : product
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
  window.location.href = 'panier.html';
}

document.addEventListener('click', function (event) {
  event.preventDefault();
  const element = event.target;
  if (element.tagName == 'A' && element.classList.contains("add-cart")) {
    addToCart();
  }
});
