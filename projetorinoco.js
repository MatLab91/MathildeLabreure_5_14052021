


products.forEach((item) => {
    const newProductHtml = <li>${item.title}</li>;
    const homeIntro = document.querySelector('#home-intro');
    homeIntro.innerHTML += newProductHtml;
})



fetch("http://localhost:3000/api/teddies")
.then((resp) => resp.json())
.then(function(products) {
  console.log(products);
  
  products.forEach((item) => {
    const newProductHtml = <li>${item.name}</li>;
    const homeIntro = document.querySelector('.album');
    homeIntro.innerHTML += newProductHtml;
  })
})
.catch(function(error) {
  console.log(error);
});