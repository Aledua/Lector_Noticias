// Paso 1: Configuración
const apiKey = '66b7d133d6aca02f678fec9168ade1af';

// Usamos concatenación simple (+) para evitar errores con las comillas
const url = 'http://gnews.io/api/v4/top-headlines?category=technology&lang=es&max=9&apikey=' + apiKey;

// Paso 2: Función principal
function cargarNoticias() {
    const contenedor = document.getElementById('contenedor-noticias');
    const mensajeError = document.getElementById('mensaje-error');

    // Limpieza inicial
    contenedor.innerHTML = ''; 
    mensajeError.classList.add('oculto');
    contenedor.innerHTML = '<p style="text-align:center; width:100%">Cargando noticias...</p>';

    // Paso 3: Petición Fetch
    fetch(url)
        .then(function(response) {
            // Verifico si la respuesta es correcta (status 200)
            if (!response.ok) {
                // Si la API dice que no (ej. error 403), lanzamos un error
                throw new Error('La API rechazó la conexión. Status: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            contenedor.innerHTML = ''; // Borro el mensaje de cargando

            // Verifico que existan artículos
            if (data.articles && data.articles.length > 0) {
                mostrarNoticias(data.articles);
            } else {
                mostrarError('La API respondió, pero no hay noticias para mostrar.');
            }
        })
        .catch(function(error) {
            // Este bloque captura errores de red o de la API
            console.error('Error detectado:', error);
            contenedor.innerHTML = '';
            mostrarError('Error de conexión. Verifica que tengas internet y que la API Key sea válida.');
        });
}

// Paso 4: Renderizado
function mostrarNoticias(articulos) {
    const contenedor = document.getElementById('contenedor-noticias');

    articulos.forEach(function(articulo) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'noticia-card';

        // Si no hay imagen, usamos una gris genérica
        const imagen = articulo.image || 'https://via.placeholder.com/300x200?text=Noticia';

        // Construcción del HTML de la tarjeta
        tarjeta.innerHTML = 
            '<img src="' + imagen + '" alt="Imagen" class="noticia-imagen">' +
            '<div class="noticia-contenido">' +
                '<a href="' + articulo.url + '" target="_blank" class="noticia-titulo">' + articulo.title + '</a>' +
                '<p class="noticia-descripcion">' + (articulo.description || 'Sin descripción.') + '</p>' +
                '<p class="noticia-fecha">' + new Date(articulo.publishedAt).toLocaleDateString() + '</p>' +
            '</div>';

        contenedor.appendChild(tarjeta);
    });
}

// Paso 5: Mostrar Errores
function mostrarError(mensaje) {
    const divError = document.getElementById('mensaje-error');
    divError.textContent = mensaje;
    divError.classList.remove('oculto');
}

// Inicializar
cargarNoticias();

