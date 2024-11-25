import { importSvgIcons } from '../library.js';

const d21Header = document.querySelector('#d21-header')
const d22Header = document.querySelector('#d22-header')
const d23Header = document.querySelector('#d23-header')
const d24Header = document.querySelector('#d24-header')

const svgIcons = importSvgIcons();

function freeSex(e, el, res, header) {

    if (event.target.tagName === "INPUT") {
        // Se è un input, non fare nulla e ritorna
        return;
    }

    if (el.className == "hidden"){
        header.firstElementChild.innerHTML = svgIcons.iconUp
        el.className = "enabled";
        res.className = "enabled"
    }
    else {
        header.firstElementChild.innerHTML = svgIcons.iconDown;
        el.className = "hidden";
        res.className = "hidden"
    }
}

d21Header.addEventListener("click", (e) => {

    const element = document.querySelector("#d21-container")
    const res = document.querySelector("#d21-result")
    freeSex(e, element, res, d21Header)
});

d22Header.addEventListener("click", (e) => {

    const element = document.querySelector("#d22-container")
    const res = document.querySelector("#d22-result")
    freeSex(e, element, res, d22Header)
});

d23Header.addEventListener("click", (e) => {

    const element = document.querySelector("#d23-container")
    const res = document.querySelector("#d23-result")
    freeSex(e, element, res, d23Header)
});

d24Header.addEventListener("click", (e) => {

    const element = document.querySelector("#d24-container")
    const res = document.querySelector("#d24-result")
    freeSex(e, element, res, d24Header)
});