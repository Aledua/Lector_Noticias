// CONFIGURACIÓN
const url = 'https://api.first.org/data/v1/news';

// DATOS DE RESPALDO (Plan B)
const noticiasRespaldo = [
    {
        title: "La Inteligencia Artificial transforma el desarrollo web",
        summary: "Nuevas herramientas permiten a los desarrolladores crear sitios más rápidos.",
        link: "#",
        published: "2026-01-29"
    },
    {
        title: "JavaScript domina el mercado en 2025",
        summary: "El lenguaje sigue siendo el rey indiscutible del frontend.",
        link: "#",
        published: "2026-01-28"
    }
];

// BANCO DE IMÁGENES (Para variar el diseño visual)
const imagenesTech = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=60', // Chip
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=60', // Código
    'https://images.unsplash.com/photo-1531297425163-4366e6677f38?auto=format&fit=crop&w=500&q=60', // Laptop
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=60', // Matrix/Seguridad
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60', // Pantalla
    'https://images.unsplash.com/photo-1504384308090-c54be3855463?auto=format&fit=crop&w=500&q=60'  // Oficina
];

function cargarNoticias() {
    const contenedor = document.getElementById('contenedor-noticias');
    const mensajeError = document.getElementById('mensaje-error');

    contenedor.innerHTML = ''; 
    mensajeError.classList.add('oculto');
    contenedor.innerHTML = '<p style="text-align:center; width:100%">Conectando con servidor de noticias...</p>';

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error de conexión: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            contenedor.innerHTML = ''; 

            if (data.data && data.data.length > 0) {
                mostrarNoticias(data.data);
            } else {
                throw new Error('La API no devolvió datos.');
            }
        })
        .catch(function(error) {
            console.error('Error detectado:', error);
            contenedor.innerHTML = '';
            mostrarError('Nota: ' + error.message + '. Mostrando datos locales.');
            mostrarNoticias(noticiasRespaldo);
        });
}

function mostrarNoticias(articulos) {
    const contenedor = document.getElementById('contenedor-noticias');

    articulos.forEach(function(articulo) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'noticia-card';

        // LÓGICA DE IMAGEN ALEATORIA
        // Math.random() genera un número entre 0 y 1
        // Lo multiplicamos por el largo del arreglo y redondeamos hacia abajo
        const indiceAleatorio = Math.floor(Math.random() * imagenesTech.length);
        const imagen = imagenesTech[indiceAleatorio];

        tarjeta.innerHTML = 
            '<img src="' + imagen + '" alt="Noticia" class="noticia-imagen">' +
            '<div class="noticia-contenido">' +
                '<a href="' + articulo.link + '" target="_blank" class="noticia-titulo">' + articulo.title + '</a>' +
                '<p class="noticia-descripcion">' + (articulo.summary || 'Descripción no disponible.') + '</p>' +
                '<p class="noticia-fecha">' + (articulo.published || 'Fecha reciente') + '</p>' +
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
