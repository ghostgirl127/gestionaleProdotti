'use strict'

import * as lib from './library.js';

const svgIcons = lib.importSvgIcons();

//Prendi dati dal database e mostrali sotto forma di Html
lib.loadDataFromDB(svgIcons).then(() => {

    lib.addDeleteListeners();  // Aggiungi i listener per il pulsante "X"

    setInterval(() => {

        let d21r = document.getElementById("d21-result");
        let d22r = document.getElementById("d22-result");
        let d23r = document.getElementById("d23-result");
        let d24r = document.getElementById("d24-result");

        let d21c = document.getElementById("d21-container").children;
        let d22c = document.getElementById("d22-container").children;
        let d23c = document.getElementById("d23-container").children;
        let d24c = document.getElementById("d24-container").children;

        let obj21 = null;
        let obj22 = null;
        let obj23 = null;
        let obj24 = null;


        if(d21c[0]) {
            obj21 = [{
                itemName: d21c[0].querySelector('.item-name').textContent,
                itemUnit: d21c[0].querySelector('.item-unit').textContent,
                itemWeight: d21c[0].querySelector('.item-weight').textContent,
            }];
        }

        if(d22c[0]) {
            obj22 = [{
                itemName: d22c[0].querySelector('.item-name').textContent,
                itemUnit: d22c[0].querySelector('.item-unit').textContent,
                itemWeight: d22c[0].querySelector('.item-weight').textContent,
            }];
        }

        if(d23c[0]) {
            obj23 = [{
                itemName: d23c[0].querySelector('.item-name').textContent,
                itemUnit: d23c[0].querySelector('.item-unit').textContent,
                itemWeight: d23c[0].querySelector('.item-weight').textContent,
            }];
        }

        if(d24c[0]) {
            obj24 = [{
                itemName: d24c[0].querySelector('.item-name').textContent,
                itemUnit: d24c[0].querySelector('.item-unit').textContent,
                itemWeight: d24c[0].querySelector('.item-weight').textContent,
            }];
        }

        let i = 0;
        for (let li of d21c) {

            if (li.className == "hidden") continue;

            let found = false;

            if (i==0) {
                i++;
                continue;
            }
            
            const name = li.querySelector('.item-name').textContent;
            const weight = li.querySelector('.item-weight').textContent;
            const unit = li.querySelector('.item-unit').textContent;

            for(let i=0; i<obj21.length; i++) {
                if (obj21[i].itemName == name && obj21[i].itemWeight == weight) {
                    obj21[i].itemUnit = parseFloat(obj21[i].itemUnit) + parseFloat(unit)
                    found = true
                }
            }

            if (found) continue;

            obj21.push({
                itemName: li.querySelector('.item-name').textContent,
                itemUnit: li.querySelector('.item-unit').textContent,
                itemWeight: li.querySelector('.item-weight').textContent,
            }) 
        }

        i = 0;
        for (let li of d22c) {

            if (li.className == "hidden") continue;

            let found = false;

            if (i==0) {
                i++;
                continue;
            }
            
            const name = li.querySelector('.item-name').textContent;
            const weight = li.querySelector('.item-weight').textContent;
            const unit = li.querySelector('.item-unit').textContent;

            for(let i=0; i<obj22.length; i++) {
                if (obj22[i].itemName == name && obj22[i].itemWeight == weight) {
                    obj22[i].itemUnit = parseFloat(obj22[i].itemUnit) + parseFloat(unit)
                    found = true
                }
            }

            if (found) continue;

            obj22.push({
                itemName: li.querySelector('.item-name').textContent,
                itemUnit: li.querySelector('.item-unit').textContent,
                itemWeight: li.querySelector('.item-weight').textContent,
            }) 
        }

        i = 0;
        for (let li of d23c) {

            if (li.className == "hidden") continue;

            let found = false;

            if (i==0) {
                i++;
                continue;
            }
            
            const name = li.querySelector('.item-name').textContent;
            const weight = li.querySelector('.item-weight').textContent;
            const unit = li.querySelector('.item-unit').textContent;

            for(let i=0; i<obj23.length; i++) {
                if (obj23[i].itemName == name && obj23[i].itemWeight == weight) {
                    obj23[i].itemUnit = parseFloat(obj23[i].itemUnit) + parseFloat(unit)
                    found = true
                }
            }

            if (found) continue;

            obj23.push({
                itemName: li.querySelector('.item-name').textContent,
                itemUnit: li.querySelector('.item-unit').textContent,
                itemWeight: li.querySelector('.item-weight').textContent,
            }) 
        }

        i = 0;
        for (let li of d24c) {

            if (li.className == "hidden") continue;

            let found = false;

            if (i==0) {
                i++;
                continue;
            }
            
            const name = li.querySelector('.item-name').textContent;
            const weight = li.querySelector('.item-weight').textContent;
            const unit = li.querySelector('.item-unit').textContent;

            for(let i=0; i<obj24.length; i++) {
                if (obj24[i].itemName == name && obj24[i].itemWeight == weight) {
                    obj24[i].itemUnit = parseFloat(obj24[i].itemUnit) + parseFloat(unit)
                    found = true
                }
            }

            if (found) continue;

            obj24.push({
                itemName: li.querySelector('.item-name').textContent,
                itemUnit: li.querySelector('.item-unit').textContent,
                itemWeight: li.querySelector('.item-weight').textContent,
            }) 
        }

        if (obj21)
            obj21.sort((a, b) => {
                return a.itemName.localeCompare(b.itemName);
            });

        if (obj22)
            obj22.sort((a, b) => {
                return a.itemName.localeCompare(b.itemName);
            });

        if (obj23)    
            obj23.sort((a, b) => {
                return a.itemName.localeCompare(b.itemName);
            });

        if (obj24)    
            obj24.sort((a, b) => {
                return a.itemName.localeCompare(b.itemName);
            });

        d21r.innerHTML = ""

        if(obj21) {
            d21r.innerHTML += "<h3 style='background-color: rgb(71, 195, 71);'>Somma</h3>"
            obj21.forEach(obj => {
                d21r.innerHTML += `
                    <div class="flex-container" style="justify-content: center;">
                            <div class="item-name">${obj.itemName}</div>
                            <div class="item-unit" style="width: 50%">${obj.itemUnit} ${obj.itemWeight}</div>
                    </div>
                `
            });
        }
        d22r.innerHTML = ""
        if(obj22) {
            d22r.innerHTML += "<h3 style='background-color: rgb(71, 195, 71);'>Somma</h3>"
            obj22.forEach(obj => {
                d22r.innerHTML += `
                    <div class="flex-container" style="justify-content: center;">
                            <div class="item-name">${obj.itemName}</div>
                            <div class="item-unit" style="width: 50%">${obj.itemUnit} ${obj.itemWeight}</div>
                    </div>
                `
            });
        }
        d23r.innerHTML = ""
        if(obj23) {
            d23r.innerHTML += "<h3 style='background-color: rgb(71, 195, 71);'>Somma</h3>"
            obj23.forEach(obj => {
                d23r.innerHTML += `
                    <div class="flex-container" style="justify-content: center;">
                            <div class="item-name">${obj.itemName}</div>
                            <div class="item-unit" style="width: 50%">${obj.itemUnit} ${obj.itemWeight}</div>
                    </div>
                `
            });
        }
        d24r.innerHTML = ""

        if(obj24) {
            d24r.innerHTML += "<h3 style='background-color: rgb(71, 195, 71);'>Somma</h3>"
            obj24.forEach(obj => {
                d24r.innerHTML += `
                    <div class="flex-container" style="justify-content: center;">
                            <div class="item-name">${obj.itemName}</div>
                            <div class="item-unit" style="width: 50%">${obj.itemUnit} ${obj.itemWeight}</div>
                    </div>
                `
            });
        }
    }, 2000);

}).catch((error) => {
    console.error("Errore durante il caricamento dei dati:", error);
});
