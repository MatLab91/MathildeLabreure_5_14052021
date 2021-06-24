//////////////////
// PAGE PANIER //
//////////////////

// La fonction vérifie que l'utilisateur a bien rempli le formulaire avec les valeurs attendues. 
// Si ces valeurs sont conformes, alors les informations du formulaire et des produits du panier sont alors envoyés au serveur.
// Une fois ces informations envoyées, la fonction supprime les variables dans le local storage.
document.querySelector('#form').addEventListener('submit', function validateForm(event) {
    event.preventDefault();
    if (validateFormOrder()) {

        let cartItems = localStorage.getItem("productsInCart");
        
        if (cartItems == null) {
            alert("Votre panier est vide, vous ne pouvez pas passer de commande. Veuillez ajouter au moins un article.");
        }

        cartItems = JSON.parse(cartItems);

        // Création d'un objet que l'on enverra en POST, contenant les informations du formulaire de contact et les IDs des produits
        const order = {
            contact: {
                firstName: document.querySelector('#fname').value,
                lastName: document.querySelector('#flastname').value,
                address: document.querySelector('#faddress').value + ' ' + document.querySelector('#fzip').value,
                city: document.querySelector('#fcity').value,
                email: document.querySelector('#femail').value,
            },
            products: Object.keys(cartItems),
        }

        console.log(order);
        // Option du fetch, afin de préciser la méthode d'envoi (POST), les données à envoyer ci-dessus et des header afin de préciser que le contenu envoyé est du JSON
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        }

        const categorie = localStorage.getItem("categorie");
        fetch("http://localhost:3000/api/" + categorie + "/order", requestOptions)
            .then((response) => response.json())
            .then((resultData) => {
                // Suppression de toutes les informations contenues dans le local storage et redirection sur la page de confirmation
                console.log(resultData);
                localStorage.removeItem('productsInCart');
                localStorage.removeItem('nombre_articles_ajoutes');
                localStorage.removeItem('categorie');
                localStorage.setItem("totalCostConfirmation", localStorage.getItem("totalCost"));
                localStorage.removeItem('totalCost');
                window.location.href = `confirmation.html?orderId=${resultData.orderId}`
            })
            .catch(() => {
                alert(error)
            })
    }
})

function validateFormOrder() {
    let myRegexText = /^[a-zA-Z-\s]+$/;
    let myRegexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let myRegexAddress = /^[0-9]+[a-zA-Z,\.\s]+/;
    // let myRegexZip = /^[0-9]{5}(-[0-9]{4})?/;

    var name = document.querySelector('#fname').value;
    if (name == "") {
        alert("Le prénom doit être renseigné.");
        return false;
    } else if (myRegexText.test(name) == false) {
        alert("Le prénom ne peut comporter que des lettres.");
        return false;
    }

    var lastName = document.querySelector('#flastname').value;
    if (lastName == "") {
        alert("Le nom doit être renseigné.");
        return false;
    } else if (myRegexText.test(lastName) == false) {
        alert("Le nom ne peut comporter que des lettres.");
        return false;
    }

    var email = document.querySelector('#femail').value;
    if (email == "") {
        alert("L'adresse email doit être renseignée, afin de vous tenir informé(e) de la livraison.");
        return false;
    } else if (myRegexEmail.test(email) == false) {
        alert("L'adresse email n'est pas valide.");
        return false;
    }

    var address = document.querySelector('#faddress').value;
    if (address == "") {
        alert("L'adresse de livraison doit être renseignée.");
        return false;
    } else if (myRegexAddress.test(address) == false) {
        alert("L'adresse de livraison n'est pas valide.");
        return false;
    }

    var country = document.querySelector('#fcountry').value;
    if (country == "") {
        alert("Le pays doit être renseigné.");
        return false;
    }

    var city = document.querySelector('#fcity').value;
    if (city == "") {
        alert("La ville doit être renseignée.");
        return false;
    }

    var zip = document.querySelector('#fzip').value;
    if (zip == "") {
        alert("Le code postal doit être renseigné.");
        return false;
    } else if (isNaN(zip)) {
        alert("Le code postal n'est pas valide. Il doit uniquement comporter des chiffres sans espace.");
        return false;
    }
    return true;
}

// La fonction permet de supprimer les articles ajoutés au panier en cliquant sur le bouton "Vider mon panier"
var deleteButton = document.getElementById('deleteButton');
let productsContainer = document.querySelector(".products");
let cartCost = localStorage.getItem("totalCost");

deleteButton.addEventListener('click', function deleteButton() {
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('nombre_articles_ajoutes');
    localStorage.removeItem('categorie');
    localStorage.removeItem('totalCost');
    productsContainer.innerHTML = '';
    cartCost.innerHTML = '';
    document.querySelector('.panier span').innerHTML = '';
    document.querySelector(".nombre_article").innerHTML = '';
    document.querySelector(".total").innerHTML = '';
})