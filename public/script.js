function esURLValida(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

async function resumir() {
  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value.trim();

  const resumenEl = document.getElementById('resumen');
  const tituloEl = document.getElementById('titulo');
  const card = document.getElementById('resultado');
  const error = document.getElementById('error');
  const boton = document.querySelector('button');

  error.classList.add('d-none');
  card.classList.add('d-none');

  if (!url) {
    error.textContent = '⚠️ Por favor ingresa una URL.';
    error.classList.remove('d-none');
    return;
  }

  if (!esURLValida(url)) {
    error.textContent = '⚠️ La URL ingresada no es válida.';
    error.classList.remove('d-none');
    return;
  }

  resumenEl.textContent = 'Generando resumen...';
  tituloEl.textContent = '';
  card.classList.remove('d-none');
  boton.disabled = true;

  try {
    const res = await fetch('/resumir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    tituloEl.textContent = data.titulo;
    resumenEl.textContent = data.resumen;
  } catch (err) {
    card.classList.add('d-none');
    error.textContent = '❌ Ocurrió un error al resumir la noticia.';
    error.classList.remove('d-none');
    console.error(err);
  } finally {
    boton.disabled = false;
  }
}
