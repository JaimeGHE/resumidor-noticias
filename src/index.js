require('dotenv').config();
console.log('Token Hugging Face:', process.env.HUGGINGFACE_API_TOKEN);

const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

async function resumirTextoConHuggingFace(texto) {
  const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: texto },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al llamar a Hugging Face:', error.response?.data || error.message);
    throw error;
  }
}

app.post('/resumir', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Falta la URL en el cuerpo de la solicitud' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return res.status(500).json({ error: 'No se pudo extraer el texto del artículo' });
    }

    const textoReducido = article.textContent.slice(0, 2000);
    const resumen = await resumirTextoConHuggingFace(textoReducido);

    res.json({
      titulo: article.title,
      resumen: resumen[0]?.summary_text || 'No se pudo generar resumen',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al procesar la página o generar el resumen',
      detalle: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
