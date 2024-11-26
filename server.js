const express = require("express");
const app = express();
const fs = require("fs"); // Per leggere il file JSON
const port = 3001;
const path = require("path");
const bodyParser = require('body-parser');

// Middleware per analizzare i dati del form (urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post('/aggiorna-valore/:id', async (req, res) => {
  try {
      // Ottieni il nuovo valore
      const { id } = req.params;
      const valore = parseFloat(req.body.valore);  // Converti il valore in un numero intero

      // Leggi il database esistente
      let database = await leggiDatabase();

      // Aggiungi il valore alla proprietà "numero"
      switch(id) {
        case "21":
          database.last21 = valore;
          break;
        
        case "22":
          database.last22 = valore;
          break;

        case "23":
          database.last23 = valore;
          break;

        case "24":
          database.last24 = valore;
          break;
      }
      

      // Scrivi il nuovo database nel file
      await scriviDatabase(database);

      // Rispondi al client
      res.json({ status: 'success', message: 'Valore aggiornato', nuovo_valore: database.numero });
  } catch (err) {
      console.error('Errore:', err);
      res.status(500).json({ status: 'error', message: 'Errore nel server' });
  }
});

app.post('/update-valore', async (req, res) => {
  try {
    // Ottieni il nuovo valore
    const nome = req.body.nome;
    const quantita = parseFloat(req.body.quantita);
    const peso = req.body.peso;
    const date = req.body.date;

    let database = await leggiDatabase();

    database.lastId = database.lastId+1;

    let obj = {
      id: database.lastId,
      nome: nome,
      quantita: quantita,
      peso: peso
    }

    if (date == "d21")
      database.ordini21.push(obj)
    if (date == "d22")
      database.ordini22.push(obj)
    if (date == "d23")
      database.ordini23.push(obj)
    if (date == "d24")
      database.ordini24.push(obj)

    await scriviDatabase(database);

} catch (err) {
    console.error('Errore:', err);
    res.status(500).json({ status: 'error', message: 'Errore nel server' });
}
})

app.post('/delete-valore', async (req, res) => {
  try {
    // Ottieni il nuovo valore
    const valore = parseInt(req.body.valore);  // Converti il valore in un numero intero

    // Leggi il database esistente
    let database = await leggiDatabase();


    for(let i = 0; database.ordini21[i]; i++) {
        if(database.ordini21[i].id == valore) {
          database.ordini21.splice(i, 1);
        }
    }
    for(let i = 0; database.ordini22[i]; i++) {
      if(database.ordini22[i].id == valore) {
        database.ordini22.splice(i, 1);
      }
  }
  for(let i = 0; database.ordini23[i]; i++) {
    if(database.ordini23[i].id == valore) {
      database.ordini23.splice(i, 1);
    }
}
  for(let i = 0; database.ordini24[i]; i++) {
    if(database.ordini24[i].id == valore) {
      database.ordini24.splice(i, 1);
    }
  }
    
  await scriviDatabase(database);

    
} catch (err) {
    console.error('Errore:', err);
    res.status(500).json({ status: 'error', message: 'Errore nel server' });
}
})

// Route per fornire i dati JSON (se desideri fare una richiesta AJAX)
app.get("/data", (req, res) => {
  const filePath = path.join(__dirname, "database.json"); // Percorso del file JSON

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Errore nella lettura del file:", err);
      return res.status(500).json({ error: "Errore nel leggere i dati" });
    }

    // Parsea i dati JSON
    const parsedData = JSON.parse(data);
    res.json(parsedData); // Invia i dati JSON al client
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

// Funzione per leggere il file JSON
function leggiDatabase() {
  return new Promise((resolve, reject) => {
      fs.readFile('database.json', 'utf8', (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve(JSON.parse(data));
          }
      });
  });
}

// Funzione per scrivere nel file JSON
function scriviDatabase(dati) {
  return new Promise((resolve, reject) => {
      fs.writeFile('database.json', JSON.stringify(dati, null, 2), 'utf8', (err) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });
}
