const input21 = document.querySelector("#last21")
const input22 = document.querySelector("#last22")
const input23 = document.querySelector("#last23")
const input24 = document.querySelector("#last24")

function aggiornaValore(id) {
    // Ottieni il valore dell'input

    let numero;

    if (id == "21")
        numero = input21.value;
    if (id == "22")
        numero = input22.value;
    if (id == "23")
        numero = input23.value;
    if (id == "24")
        numero = input24.value;

    // Invia il dato al server usando fetch
    fetch(`/aggiorna-valore/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specifica il tipo di contenuto
        },
        body: JSON.stringify({
            valore: numero // Invia il valore come JSON
        })
    })
    .catch(error => {
        console.error('Errore:', error);
    });
}

input21.addEventListener('input', function() {
    aggiornaValore("21")
});
input22.addEventListener('input', function() {
    aggiornaValore("22")
});
input23.addEventListener('input', function() {
    aggiornaValore("23")
});
input24.addEventListener('input', function() {
    aggiornaValore("24")
});
