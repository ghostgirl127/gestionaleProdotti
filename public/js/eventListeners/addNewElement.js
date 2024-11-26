import { importSvgIcons } from '../library.js';

const svgIcons = importSvgIcons();

// Crea nuova riga quando il pulsante "aggiungi" viene cliccato
document.getElementById("addBtn").addEventListener("click", () => {
    const d21 = document.querySelector("#d21-container");
    const d22 = document.querySelector("#d22-container");
    const d23 = document.querySelector("#d23-container");
    const d24 = document.querySelector("#d24-container");

    // Ottieni i valori dagli input
    const inputOrder = document.getElementById("order").value;
    const inputQuantita = document.getElementById("quantita").value;
    const inputPeso = document.getElementById("peso").value;
    let inputDate = document.getElementById("date").value;


    let bakaSempai

    fetch('/data')
    .then(response => response.json())
    .then(data => {

        bakaSempai = data.lastId

        // Controlla se i campi richiesti sono vuoti
        if (inputOrder.trim() === '') return alert("Dovresti scrivere qualcosa nel campo ordine");

        if (inputQuantita === "Peso") inputQuantita = ""
    
        if (inputDate === "d21") {
            d21.innerHTML += pushData("21", bakaSempai, inputOrder, inputQuantita, inputPeso);
        }
        if (inputDate === "d22") {
            d22.innerHTML += pushData("22", bakaSempai, inputOrder, inputQuantita, inputPeso);
        }
        if (inputDate === "d23") {
            d23.innerHTML += pushData("23", bakaSempai, inputOrder, inputQuantita, inputPeso);
        }
        if (inputDate === "d24") {
            d24.innerHTML += pushData("24", bakaSempai, inputOrder, inputQuantita, inputPeso);
        }
    
        // Resetta i campi di input
        document.getElementById("order").value = "";
        document.getElementById("quantita").value = "";


        fetch('/update-valore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specifica il tipo di contenuto
            },
            body: JSON.stringify({
                nome: inputOrder.toUpperCase().trim(),
                quantita: inputQuantita.replace(/,/g, "."),
                peso: inputPeso.toUpperCase().trim(),
                date: inputDate
            })
        })
    
    })
    .catch(error => {
        console.error("errore nel caricare i dati: ", error)
    });
});

function pushData(n, bakaSempai, inputOrder, inputQuantita, inputPeso) {

    let neww = -1

    try {
       if (n == "21")
        neww = parseInt(document.querySelector("#d21-container li:last-child").querySelector('.item-id').textContent)

    if (n == "22")
        neww = parseInt(document.querySelector("#d22-container li:last-child").querySelector('.item-id').textContent)

    if (n == "23")
        neww = parseInt(document.querySelector("#d23-container li:last-child").querySelector('.item-id').textContent)

    if (n == "24")
        neww = parseInt(document.querySelector("#d24-container li:last-child").querySelector('.item-id').textContent)     
    } catch (error) {
        console.log("new created")
    }
    


   return `
        <li>
            <div class="flex-container">
                <div class="item-id" id="${++bakaSempai}">${++neww}</div> 
                <div class="item-name">${inputOrder.toUpperCase().trim()}</div>
                <div class="item-unit">${inputQuantita.replace(/,/g, ".")}</div>
                <div class="item-weight">${inputPeso.toUpperCase().trim()}</div>
                <span class="close">\u00D7</span>
            </div>
        </li>
    `
}
