require('dotenv').config();
console.log('Token Hugging Face:', process.env.HUGGINGFACE_API_TOKEN);

const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function resumirTextoConHuggingFace(texto) {
  const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

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
}

app.get('/', (req, res) => {
  res.send('📰 API de resumen de noticias funcionando');
});

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
    res.status(500).json({ error: 'Error al procesar la página', detalle: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
