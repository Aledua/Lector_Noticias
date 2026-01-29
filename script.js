// CONFIGURACIÓN
const apiKey = '66b7d133d6aca02f678fec9168ade1af';
// Usamos 'search' con la query 'tecnologia' que es más robusto para encontrar resultados
const url = 'https://gnews.io/api/v4/search?q=tecnologia&lang=es&max=6&apikey=' + apiKey;

// PLAN B: Datos de respaldo por si la API falla (Mock Data)
const noticiasRespaldo = [
    {
        title: "La Inteligencia Artificial transforma el desarrollo web",
        description: "Nuevas herramientas permiten a los desarrolladores crear sitios más rápidos.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=60",
        url: "#",
        publishedAt: new Date().toISOString()
    },
    {
        title: "El futuro de JavaScript en 2024",
        description: "Las nuevas funcionalidades de ECMAScript prometen revolucionar el código.",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=500&q=60",
        url: "#",
        publishedAt: new Date().toISOString()
    },
    {
        title: "Ciberseguridad: Un reto creciente",
        description: "Empresas tecnológicas invierten millones en proteger datos de usuarios.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=60",
        url: "#",
        publishedAt: new Date().toISOString()
    }
];

function cargarNoticias() {
    const contenedor = document.getElementById('contenedor-noticias');
    const mensajeError = document.getElementById('mensaje-error');

    contenedor.innerHTML = ''; 
    mensajeError.classList.add('oculto');
    contenedor.innerHTML = '<p style="text-align:center; width:100%">Conectando con GNews API...</p>';

    fetch(url)
        .then(function(response) {
            // Si la respuesta no es OK (ej. error 403 o 401), lanzamos error
            if (!response.ok) {
                throw new Error(response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            contenedor.innerHTML = ''; // Limpiar cargando
            
            if (data.articles && data.articles.length > 0) {
                mostrarNoticias(data.articles);
            } else {
                throw new Error('La API no devolvió artículos.');
            }
        })
        .catch(function(error) {
            console.error('Fallo la API, cargando respaldo:', error);
            contenedor.innerHTML = '';
            
            // Muestra el error técnico en pantalla pequeña para saber qué pasó
            mostrarError('Modo Offline: ' + error.message + '. Cargando datos de ejemplo...');
            
            // CARGAMOS EL RESPALDO AUTOMÁTICAMENTE
            mostrarNoticias(noticiasRespaldo);
        });
}

function mostrarNoticias(articulos) {
    const contenedor = document.getElementById('contenedor-noticias');

    articulos.forEach(function(articulo) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'noticia-card';

        const imagen = articulo.image || 'https://via.placeholder.com/300x200?text=Noticia';

        tarjeta.innerHTML = 
            '<img src="' + imagen + '" alt="Imagen" class="noticia-imagen">' +
            '<div class="noticia-contenido">' +
                '<a href="' + articulo.url + '" target="_blank" class="noticia-titulo">' + articulo.title + '</a>' +
                '<p class="noticia-descripcion">' + (articulo.description || 'Sin descripción disponible.') + '</p>' +
                '<p class="noticia-fecha">' + new Date(articulo.publishedAt).toLocaleDateString() + '</p>' +
            '</div>';

        contenedor.appendChild(tarjeta);
    });
}

function mostrarError(mensaje) {
    const divError = document.getElementById('mensaje-error');
    divError.textContent = mensaje;
    divError.classList.remove('oculto');
}

// Iniciar
cargarNoticias();
