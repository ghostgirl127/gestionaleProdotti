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

            console.log(i)

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

            const conferma = confirm("Sei sicuro di voler eliminare questo elemento?");

            if(!conferma) return;

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
            }
        }
    });
}
