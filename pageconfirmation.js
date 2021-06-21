///////////////////////
// PAGE CONFIRMATION //
///////////////////////

// Affiche le numéro de commande donné par le serveur
const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'
document.getElementById('commandId').textContent = orderId

// Affiche le prix total de la commande
let totalConfirmation = localStorage.getItem("totalCostConfirmation");
document.getElementById('totalCostConfirmation').innerHTML = parseInt(totalConfirmation) / 100 + ",00€";