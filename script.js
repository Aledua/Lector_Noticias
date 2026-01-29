// Paso 1: Definir la configuración de la API
const apiKey = '66b7d133d6aca02f678fec9168ade1af'; 
const url = `https://gnews.io/api/v4/search?q=tecnologia&lang=es&max=9&apikey=${apiKey}`;

// Paso 2: Función principal para cargar noticias
function cargarNoticias() {
    // Selecciono los elementos del DOM que voy a manipular
    const contenedor = document.getElementById('contenedor-noticias');
    const mensajeError = document.getElementById('mensaje-error');

    // Limpio el contenido anterior y oculto errores previos
    contenedor.innerHTML = ''; 
    mensajeError.classList.add('oculto');

    // Aviso visual de carga (opcional pero recomendado para UX)
    contenedor.innerHTML = '<p style="text-align:center; width:100%">Cargando noticias...</p>';

    // Paso 3: Petición Fetch (AJAX)
    fetch(url)
        .then(function(response) {
            // Verifico si la respuesta de la red es correcta
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            // Convierto la respuesta cruda a formato JSON
            return response.json();
        })
        .then(function(data) {
            // Limpio el mensaje de "Cargando..."
            contenedor.innerHTML = '';

            // Verifico si hay artículos en el JSON recibido
            // GNews devuelve los artículos dentro de una propiedad llamada 'articles'
            if (data.articles && data.articles.length > 0) {
                mostrarNoticias(data.articles);
            } else {
                mostrarError('No se encontraron noticias disponibles en este momento.');
            }
        })
        .catch(function(error) {
            // Manejo de errores (si falla internet o la API key es incorrecta)
            console.error('Hubo un problema con la petición Fetch:', error);
            contenedor.innerHTML = ''; // Limpio el cargando
            mostrarError('Error al cargar las noticias. Por favor, verifica tu conexión o la API Key.');
        });
}

// Paso 4: Función para renderizar (pintar) las noticias en el HTML
function mostrarNoticias(articulos) {
    const contenedor = document.getElementById('contenedor-noticias');

    // Recorro cada artículo recibido del JSON (bucle)
    articulos.forEach(function(articulo) {
        // Creo un elemento div para la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'noticia-card';

        // Defino una imagen por defecto si la noticia no trae una
        const imagen = articulo.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen';

        // Construyo el HTML interno de la tarjeta usando Template Strings
        // Esto incluye la imagen, título clickeable (link) y descripción
        tarjeta.innerHTML = `
            <img src="${imagen}" alt="Imagen de la noticia" class="noticia-imagen">
            <div class="noticia-contenido">
                <a href="${articulo.url}" target="_blank" class="noticia-titulo">${articulo.title}</a>
                <p class="noticia-descripcion">${articulo.description || 'Descripción no disponible.'}</p>
                <p class="noticia-fecha">${new Date(articulo.publishedAt).toLocaleDateString()}</p>
            </div>
        `;

        // Añado la tarjeta creada al contenedor principal
        contenedor.appendChild(tarjeta);
    });
}

// Paso 5: Función auxiliar para mostrar errores en pantalla
function mostrarError(mensaje) {
    const divError = document.getElementById('mensaje-error');
    divError.textContent = mensaje;
    divError.classList.remove('oculto');
}

// Cargar las noticias automáticamente al abrir la página
cargarNoticias();