# Resumidor de Noticias

Este es un proyecto personal en desarrollo, creado como prototipo experimental. Su propósito es **extraer y resumir automáticamente noticias a partir de una URL**, utilizando IA para generar el resumen de forma automática.

> ⚠️ **Este proyecto aún está en construcción**. Tiene limitaciones importantes. Lo estoy desarrollando como parte de mi portfolio técnico.

---

## 🚀 ¿Qué hace?

- Recibe una URL de una noticia en formato web.
- Extrae el contenido del artículo usando un parser semántico (Readability).
- Resume el texto automáticamente utilizando un modelo de IA alojado en Hugging Face (`facebook/bart-large-cnn`).
- Muestra el título y resumen en una interfaz web simple.

---

## 🛠️ Tecnologías utilizadas

- **Node.js + Express** para el backend.
- **Axios + jsdom + @mozilla/readability** para extraer el contenido.
- **Hugging Face API** para generar el resumen.
- **HTML/CSS/JS** organizados en archivos separados.
- **GitHub Codespaces** como entorno de desarrollo.

---

## 🧪 Estado actual

- [x] Extracción automática del texto de la noticia  
- [x] Generación de resumen con modelo IA  
- [x] Interfaz limpia 
- [x] Validaciones básicas y mensajes de error  
- [ ] Animaciones suaves y experiencia de usuario mejorada  
- [ ] Soporte completo para múltiples idiomas  
- [ ] Mejora de la calidad de los resúmenes  

---

## 🎯 Objetivos del proyecto

- Practicar el desarrollo de un stack completo con frontend y backend conectados.
- Integrar servicios de IA reales con una app útil.
- Mostrar un prototipo funcional en GitHub como parte de mi portfolio.
- Aprender buenas prácticas en diseño de interfaces, validación de entradas y manejo de errores.

---

## 📌 Limitaciones actuales

- El resumen depende de una API gratuita externa (puede fallar o estar limitada).
- Solo se soportan sitios de noticias con HTML bien estructurado.
- No hay autenticación, historial ni almacenamiento.
- El modelo puede fallar con textos demasiado largos o artículos en ciertos idiomas.

---

## 📬 Contacto

Este proyecto es parte de mi portfolio de desarrollador.  
Si quieres dar feedback, sugerencias o simplemente saludar:  
**[Jaime Garcia] - [jaimeghe2@gmail.com] - [www.linkedin.com/in/jaimeghe]**

---

**Licencia:** MIT  
