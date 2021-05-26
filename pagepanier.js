
//////////////////
// PAGE PANIER //
//////////////////


// Affichage du produit validé par l'acheteur dans le panier

const queryString = window.location.search; //récupère infos de l'url
const urlParams = new URLSearchParams(queryString); //objet qui represente paramètre url
const productId = urlParams.get("id"); //récupère la valeur d'un paramètre
console.log(productId);

// NOUNOURS

fetch("http://localhost:3000/api/teddies")
    .then((resp) => resp.json())
    .then(function (products) {
        console.log(products);

        
        products.forEach((item) => {
            if (productId == item._id) {
                const html2 = `<div>
                <h6 class="my-0">${item.name}</h6>
              </div>
              <span class="text-muted">${item.price}€</span>`

                const article_panier = document.querySelector('#article_panier');
                article_panier.innerHTML += html2;
            }
        }
        )
    }
    )

// MEUBLES

fetch("http://localhost:3000/api/furniture")
    .then((resp) => resp.json())
    .then(function (products) {
        console.log(products);

        
        products.forEach((item) => {
            if (productId == item._id) {
                const html2 = `<div>
                <h6 class="my-0">${item.name}</h6>
              </div>
              <span class="text-muted">${item.price}€</span>`

                const article_panier = document.querySelector('#article_panier');
                article_panier.innerHTML += html2;
            }
        }
        )
    }
    )


// CAMERAS

fetch("http://localhost:3000/api/cameras")
    .then((resp) => resp.json())
    .then(function (products) {
        console.log(products);

        
        products.forEach((item) => {
            if (productId == item._id) {
                const html2 = `<div>
                <h6 class="my-0">${item.name}</h6>
              </div>
              <span class="text-muted">${item.price}€</span>`

                const article_panier = document.querySelector('#article_panier');
                article_panier.innerHTML += html2;
            }
        }
        )
    }
    )


// Validation des données saisies par l'utilisateur

/*const myInput = document.querySelector('#hello')
myInput.addEventListener('change', function(e) {
    var value = e.target.value;
    if (value.startsWith('Hello ')) {
        isValid = true;
    } else {
        isValid = false;
    }
});*/