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

app.post('/aggiorna-valore21', async (req, res) => {
  try {
      // Ottieni il nuovo valore
      const valore = parseInt(req.body.valore);  // Converti il valore in un numero intero

      // Leggi il database esistente
      let database = await leggiDatabase();

      // Aggiungi il valore alla proprietà "numero"
      database.last21 = valore;

      // Scrivi il nuovo database nel file
      await scriviDatabase(database);

      // Rispondi al client
      res.json({ status: 'success', message: 'Valore aggiornato', nuovo_valore: database.numero });
  } catch (err) {
      console.error('Errore:', err);
      res.status(500).json({ status: 'error', message: 'Errore nel server' });
  }
});
app.post('/aggiorna-valore22', async (req, res) => {
  try {
      // Ottieni il nuovo valore
      const valore = parseInt(req.body.valore);  // Converti il valore in un numero intero

      // Leggi il database esistente
      let database = await leggiDatabase();

      // Aggiungi il valore alla proprietà "numero"
      database.last22 = valore;

      // Scrivi il nuovo database nel file
      await scriviDatabase(database);

      // Rispondi al client
      res.json({ status: 'success', message: 'Valore aggiornato', nuovo_valore: database.numero });
  } catch (err) {
      console.error('Errore:', err);
      res.status(500).json({ status: 'error', message: 'Errore nel server' });
  }
});
app.post('/aggiorna-valore23', async (req, res) => {
  try {
      // Ottieni il nuovo valore
      const valore = parseInt(req.body.valore);  // Converti il valore in un numero intero

      // Leggi il database esistente
      let database = await leggiDatabase();

      // Aggiungi il valore alla proprietà "numero"
      database.last23 = valore;

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
    const quantita = parseInt(req.body.quantita);
    const peso = req.body.peso;
    const date = req.body.date;

    console.log(nome)
    console.log(quantita)
    console.log(peso)
    console.log(date)

    let database = await leggiDatabase();

    database.lastId = database.lastId+1;

    let obj = {
      id: database.lastId,
      nome: nome,
      quantita: quantita,
      peso: peso
    }

    if (date == "d21") {
      database.ordini21.push(obj)
    }
    if (date == "d22") {
      database.ordini22.push(obj)
    }
    if (date == "d23") {
      database.ordini23.push(obj)
    }
    if (date == "d24") {
      database.ordini24.push(obj)
    }

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

    console.log(valore)

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
    
    // Scrivi il nuovo database nel file
    await scriviDatabase(database);

    
} catch (err) {
    console.error('Errore:', err);
    res.status(500).json({ status: 'error', message: 'Errore nel server' });
}
})
app.post('/aggiorna-valore24', async (req, res) => {
  try {
      // Ottieni il nuovo valore
      const valore = parseInt(req.body.valore);  // Converti il valore in un numero intero


      // Leggi il database esistente
      let database = await leggiDatabase();

      // Aggiungi il valore alla proprietà "numero"
      database.last24 = valore;

      // Scrivi il nuovo database nel file
      await scriviDatabase(database);

      // Rispondi al client
      res.json({ status: 'success', message: 'Valore aggiornato', nuovo_valore: database.numero });
  } catch (err) {
      console.error('Errore:', err);
      res.status(500).json({ status: 'error', message: 'Errore nel server' });
  }
});

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

// Endpoint per ricevere i dati dal form
app.post("/submit", (req, res) => {
  const { order, quantita, peso, data } = req.body;

  if (data === undefined) {
    const oggi = new Date();
    const giorno = oggi.getDate();
    const mese = oggi.getMonth() + 1; // i mesi partono da 0 (gennaio è 0)
    const anno = oggi.getFullYear();

    const dataFormattata = `${formatToTwoDigits(giorno)}/${formatToTwoDigits(
      mese
    )}/${anno}`;
    console.log(dataFormattata);

    number < 10 ? `0${number}` : number;

    data = dataFormattata;
    console.log(data);
  }

  // Mostra i dati ricevuti nel server (console)
  console.log("Dati ricevuti dal form:", { order, quantita, peso, data });

  // Carica i dati esistenti dal file JSON
  const filePath = path.join(__dirname, "data.json"); // Percorso del file JSON
  fs.readFile(filePath, "utf8", (err, dataFromFile) => {
    if (err) {
      return res.status(500).send("Errore nella lettura del file JSON");
    }

    // Parso i dati JSON esistenti
    let dataObj = JSON.parse(dataFromFile);

    // Aggiungi i nuovi dati all'array di ordini
    const newOrder = { nome, quantita, peso, data };
    dataObj.ordini.push(newOrder);

    // Scrivo il nuovo oggetto JSON nel file
    fs.writeFile(filePath, JSON.stringify(dataObj, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Errore nel salvataggio dei dati");
      }

      // Risposta al client con i dati aggiunti
      res.send(`<h2>Dati ricevuti e aggiunti con successo:</h2>
                      <p>Nome: ${nome}</p>
                      <p>Quantità: ${quantita}</p>
                      <p>Peso: ${peso}</p>
                      <p>Data: ${data}</p>`);
    });
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