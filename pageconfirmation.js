const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'
document.getElementById('commandId').textContent = orderId

let totalConfirmation = localStorage.getItem("totalCostConfirmation");
document.getElementById('totalCostConfirmation').innerHTML = parseInt(totalConfirmation)/100 + ",00€";