const input21 = document.querySelector("#last21")
const input22 = document.querySelector("#last22")
const input23 = document.querySelector("#last23")
const input24 = document.querySelector("#last24")
input21.addEventListener('input', function() {
    // Ottieni il valore dell'input
    var numero = input21.value;
    console.log(numero)

    // Invia il dato al server usando fetch
    fetch('/aggiorna-valore21', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specifica il tipo di contenuto
        },
        body: JSON.stringify({
            valore: numero // Invia il valore come JSON
        })
    })
    .then(response => response.json())  // Gestisci la risposta
    .then(data => {
        console.log('Risposta del server:', data);
    })
    .catch(error => {
        console.error('Errore:', error);
    });
});
input22.addEventListener('input', function() {
    // Ottieni il valore dell'input
    var numero = input22.value;
    console.log(numero)

    // Invia il dato al server usando fetch
    fetch('/aggiorna-valore22', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specifica il tipo di contenuto
        },
        body: JSON.stringify({
            valore: numero // Invia il valore come JSON
        })
    })
    .then(response => response.json())  // Gestisci la risposta
    .then(data => {
        console.log('Risposta del server:', data);
    })
    .catch(error => {
        console.error('Errore:', error);
    });
});
input23.addEventListener('input', function() {
    // Ottieni il valore dell'input
    var numero = input23.value;
    console.log(numero)

    // Invia il dato al server usando fetch
    fetch('/aggiorna-valore23', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specifica il tipo di contenuto
        },
        body: JSON.stringify({
            valore: numero // Invia il valore come JSON
        })
    })
    .then(response => response.json())  // Gestisci la risposta
    .then(data => {
        console.log('Risposta del server:', data);
    })
    .catch(error => {
        console.error('Errore:', error);
    });
});
input24.addEventListener('input', function() {
    // Ottieni il valore dell'input
    var numero = input24.value;
    console.log(numero)

    // Invia il dato al server usando fetch
    fetch('/aggiorna-valore24', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specifica il tipo di contenuto
        },
        body: JSON.stringify({
            valore: numero // Invia il valore come JSON
        })
    })
    .then(response => response.json())  // Gestisci la risposta
    .then(data => {
        console.log('Risposta del server:', data);
    })
    .catch(error => {
        console.error('Errore:', error);
    });
});