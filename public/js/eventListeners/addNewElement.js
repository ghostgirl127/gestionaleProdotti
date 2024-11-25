import { importSvgIcons, updateDatabase } from '../library.js';

const svgIcons = importSvgIcons();

// Crea nuova riga quando il pulsante "aggiungi" viene cliccato
document.getElementById("addBtn").addEventListener("click", () => {
    updateDatabase(svgIcons); // Chiama la funzione aggiornata
});