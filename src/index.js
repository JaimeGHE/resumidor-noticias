const { default: axios } = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('📰 API de resumen de noticias funcionandoooooooooo');
});

app.post('/resumir', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Falta la URL en el cuerpo de la solicitud' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    res.json({
      mensaje: 'HTML obtenido correctamente',
      url,
      longitudHTML: html.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la página', detalle: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
