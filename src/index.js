const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('📰 API de resumen de noticias funcionandoooooooooo');
});

app.post('/resumir', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Falta la URL en el cuerpo de la solicitud' });
  }

  res.json({ mensaje: 'URL recibida correctamente', url });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
