
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let datos = [];

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/guardar_datos', (req, res) => {
  const entrada = req.body;
  if (Array.isArray(entrada)) {
    datos = entrada;
  } else {
    datos.push(entrada);
    if (datos.length > 1000) datos.shift();
  }
  res.status(200).send({ status: 'OK' });
});

app.get('/api/ultimos_datos', (req, res) => {
  res.json(datos);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
