////////////////////
// PAGE D'ACCUEIL //
////////////////////
//
//Clique sur le bouton nounours pour afficher les produits de cette catégorie
//
const btn_ours = document.getElementById('btn-ours');    // On récupère l'élément sur lequel on veut détecter le clic
btn_ours.addEventListener('click', function () {          // On écoute l'événement click

  fetch("http://localhost:3000/api/teddies")
    .then((resp) => resp.json())
    .then(function (products) {
      console.log(products);

      const card = document.querySelector('#card-produit');
      card.innerHTML = "";

      products.forEach((item) => {

        const html = `<div class="col">
<div class="card shadow-sm">
  <img class="bd-placeholder-img card-img-top" src="${item.imageUrl}" width="100%" height="225" />

  <div class="card-body">
    <p class="card-text">${item.name}</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
      <a href="produit.html?id=${item._id}" type="button" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
      </div>
      <small class="text-muted">${item.price / 100}€</small>
    </div>
  </div>
</div>
</div>`

        card.innerHTML += html;

      })
    })
});
btn_ours.click();

//
// Clique sur bouton meubles en chêne pour afficher cette catégorie
//
const btn_meubles = document.getElementById('btn-meubles');    // On récupère l'élément sur lequel on veut détecter le clic
btn_meubles.addEventListener('click', function () {          // On écoute l'événement click
  // On change le contenu de notre élément pour afficher "C'est cliqué !"

  fetch("http://localhost:3000/api/furniture")
    .then((resp) => resp.json())
    .then(function (products) {
      console.log(products);

      const card = document.querySelector('#card-produit');
      card.innerHTML = "";

      products.forEach((item) => {

        const html = `<div class="col">
<div class="card shadow-sm">
  <img class="bd-placeholder-img card-img-top" src="${item.imageUrl}" width="100%" height="225" />

  <div class="card-body">
    <p class="card-text">${item.name}</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
      <a href="produit.html?id=${item._id}" type="button" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
      </div>
      <small class="text-muted">${item.price /100}€</small>
    </div>
  </div>
</div>
</div>`

        card.innerHTML += html;

      })
    })
});
//
// Clique sur bouton caméras vintage pour afficher cette catégorie
//
const btn_cameras = document.getElementById('btn-cameras');    // On récupère l'élément sur lequel on veut détecter le clic
btn_cameras.addEventListener('click', function () {          // On écoute l'événement click
  // On change le contenu de notre élément pour afficher "C'est cliqué !"

  fetch("http://localhost:3000/api/cameras")
    .then((resp) => resp.json())
    .then(function (products) {
      console.log(products);

      const card = document.querySelector('#card-produit');
      card.innerHTML = "";
      products.forEach((item) => {


        const html = `<div class="col">
<div class="card shadow-sm">
  <img class="bd-placeholder-img card-img-top" src="${item.imageUrl}" width="100%" height="225" />

  <div class="card-body">
    <p class="card-text">${item.name}</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
      <a href="produit.html?id=${item._id}" type="button" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
      </div>
      <small class="text-muted">${item.price /100}€</small>
    </div>
  </div>
</div>
</div>`

        
        card.innerHTML += html;

      })
    })
});