'use strict'

export function importSvgIcons() {

    const svgIconUp = `
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            width = "20"
            height = "20"
            fill = "currentColor"
            class = "bi bi-arrow-down"
            viewBox = "0 0 16 16"
        >  
            <path
                fill-rule="evenodd"
                d = "M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
        </svg>
    `

    const svgIconDown = `
        <svg
            xmlns = "http://www.w3.org/2000/svg" 
            width = "20" 
            height = "20" 
            fill = "currentColor" 
            class = "bi bi-arrow-up" 
            viewBox = "0 0 16 16"
        >
            <path 
                fill-rule = "evenodd" 
                d = "M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
        </svg>
    `
    
    const svgIconEdit = `
        <svg 
            xmlns = "http://www.w3.org/2000/svg"
            width = "16"
            height = "16" 
            fill = "currentColor" 
            class = "bi bi-pencil" 
            viewBox = "0 0 16 16"
        >  
            <path
                d = "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
            />
        </svg>
    `

    return {
        iconUp: svgIconUp,
        iconDown: svgIconDown,
        iconEdit: svgIconEdit
    }
}

export async function loadDataFromDB(svgIcons) {

    fetch('/data')
    .then(response => response.json())
    .then(data => {

        document.querySelector("#last21").value = data.last21
        document.querySelector("#last22").value = data.last22
        document.querySelector("#last23").value = data.last23
        document.querySelector("#last24").value = data.last24

        const ordini21 = data.ordini21
        const ordini22 = data.ordini22
        const ordini23 = data.ordini23
        const ordini24 = data.ordini24

        let counter = 0
        
        for (let i = 0; ordini21[i]; i++) {

            if (ordini21 == []) break;

            document.querySelector("#d21-container").innerHTML += `
                <li>
                    <div class="flex-container">
                        <div class="item-id" id="${ordini21[i].id}">${i}</div>
                        <div class="item-name">${ordini21[i].nome}</div>
                        <div class="item-unit">${ordini21[i].quantita}</div>
                        <div class="item-weight">${ordini21[i].peso}</div>
                        <span class="close">\u00D7</span>
                    </div>
                </li>
            `;
        }

        for (let i = 0; ordini22[i]; i++) {

            if (ordini22 == []) break;

            document.querySelector("#d22-container").innerHTML += `
                <li>
                    <div class="flex-container">
                        <div class="item-id" id="${ordini22[i].id}">${i}</div>
                        <div class="item-name">${ordini22[i].nome}</div>
                        <div class="item-unit">${ordini22[i].quantita}</div>
                        <div class="item-weight">${ordini22[i].peso}</div>
                        <span class="close">\u00D7</span>
                    </div>
                </li>
            `;
        }

        for (let i = 0; ordini23[i]; i++) {

            if (ordini23 == []) break;

            document.querySelector("#d23-container").innerHTML += `
                <li>
                    <div class="flex-container">
                        <div class="item-id" id="${ordini23[i].id}">${i}</div>
                        <div class="item-name">${ordini23[i].nome}</div>
                        <div class="item-unit">${ordini23[i].quantita}</div>
                        <div class="item-weight">${ordini23[i].peso}</div>
                        <span class="close">\u00D7</span>
                    </div>
                </li>
            `;
        }

        for (let i = 0; ordini24[i]; i++) {
            if (ordini24 == []) break;
   
            document.querySelector("#d24-container").innerHTML += `
                <li>
                    <div class="flex-container">
                        <div class="item-id" id="${ordini24[i].id}">${i}</div>
                        <div class="item-name">${ordini24[i].nome}</div>
                        <div class="item-unit">${ordini24[i].quantita}</div>
                        <div class="item-weight">${ordini24[i].peso}</div>
                        <span class="close">\u00D7</span>
                    </div>
                </li>
            `;     
        }
    
    })
    .catch(error => {
        console.error("errore nel caricare i dati: ", error)
    });
}

export function addDeleteListeners() {
    const list = document.querySelector('main'); // Seleziona l'intera lista

    list.addEventListener('click', function (event) {
        if (event.target.classList.contains('close')) {
            const li = event.target.closest('li'); // Trova il genitore più vicino
            var ulElement = event.target.closest('ul').id;

            if (li) {
                
                li.remove()

                let val = event.target.closest('.flex-container').querySelector('.item-id').getAttribute("id");
                console.log(val)
                fetch('/delete-valore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Specifica il tipo di contenuto
                    },
                    body: JSON.stringify({
                        valore: val
                    })
                })
                .then(response => response.json())  // Gestisci la risposta
                .then(data => {
                    console.log('Risposta del server:', data);
                })
                .catch(error => {
                    console.error('Errore:', error);
                });
            }
        }
    });
}

export function addEditListeners() {
    const list = document.querySelector('main'); // Seleziona l'intera lista

    // Usa un unico event listener per gestire gli eventi sui pulsanti edit
    list.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit')) {  // Se il target è un pulsante di modifica
            const li = event.target.closest('li');  // Trova il genitore <li> più vicino
            const itemName = li.querySelector('.item-name').textContent;  // Ottieni il nome dell'elemento
            const itemUnit = li.querySelector('.item-unit').textContent;
            const itemWeight = li.querySelector('.item-weight').textContent;

            let newName = prompt("Modifica nome prodotto:", itemName);
            if (newName == null || newName.trim() === "") {
                newName = itemName  // Se l'utente cancella o non inserisce nulla, mantieni il nome originale
            }
            li.querySelector('.item-name').textContent = newName;  // Aggiorna il nome

            newName = prompt("Modifica quantità:", itemUnit);
            if (newName == null || newName.trim() === "") {
                newName = itemUnit;  // Se l'utente cancella o non inserisce nulla, mantieni il nome originale
            }
            li.querySelector('.item-unit').textContent = newName;  // Aggiorna il nome

            newName = prompt("Modifica unità di misura prodotto:", itemWeight);
            if (newName == null || newName.trim() === "") {
                newName = itemWeight;  // Se l'utente cancella o non inserisce nulla, mantieni il nome originale
            }
            li.querySelector('.item-weight').textContent = newName;  // Aggiorna il nome
        }
    });
}

export function addCheckedListeners() {
    // Aggiungi simbolo "V" quando la riga viene cliccata 
    const list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            const div = ev.target.querySelector('div');
            ev.target.classList.toggle('checked');  
            console.log(ev.target.classList)
                
            if (div.style.textDecoration === 'line-through') {
                div.style.textDecoration = '';  // Rimuove la sottolineatura
            } else {
                div.style.textDecoration = 'line-through';  // Aggiunge la sottolineatura
            }
        }
    }, false);
}

export function updateDatabase(svgIcons) {

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

        const dataToPush = `
        <li>
            <div class="flex-container">
                <div class="item-id" id="${++bakaSempai}">new</div> 
                <div class="item-name">${inputOrder.toUpperCase().trim()}</div>
                <div class="item-unit">${inputQuantita}</div>
                <div class="item-weight">${inputPeso.toUpperCase().trim()}</div>
                <span class="close">\u00D7</span>
            </div>
        </li>
    `

        // Controlla se i campi richiesti sono vuoti
        if (inputOrder.trim() === '') return alert("Dovresti scrivere qualcosa nel campo ordine");

        if (inputQuantita === "Peso") inputQuantita = ""
    
        console.log(inputDate)
        if (inputDate === "d21") {
            d21.innerHTML += dataToPush;
        }
        if (inputDate === "d22") {
            d22.innerHTML += dataToPush;
        }
        if (inputDate === "d23") {
            d23.innerHTML += dataToPush;
        }
        if (inputDate === "d24") {
            d24.innerHTML += dataToPush;
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
                quantita: inputQuantita,
                peso: inputPeso.toUpperCase().trim(),
                date: inputDate
            })
        })
        .then(response => response.json())  // Gestisci la risposta
        .then(data => {
            console.log('Risposta del server:', data);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    
    })
    .catch(error => {
        console.error("errore nel caricare i dati: ", error)
    });
}
