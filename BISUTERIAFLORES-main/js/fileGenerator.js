import { githubConfig } from './github-config.js';

export const createProjectFile = async (propertyData) => {
    try {
        const template = generateHTMLTemplate(propertyData);
        
        // Codificar el contenido en Base64
        const content = btoa(unescape(encodeURIComponent(template)));
        
        // Crear o actualizar archivo en GitHub
        const response = await fetch(`https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.path}/${propertyData.urlSlug}.html`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${githubConfig.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Add/Update property: ${propertyData.name}`,
                content: content,
                branch: githubConfig.branch
            })
        });

        if (!response.ok) {
            throw new Error('Error al guardar en GitHub');
        }

        return true;
    } catch (error) {
        console.error('Error al crear archivo:', error);
        throw error;
    }
};

function generateHTMLTemplate(propertyData) {
    // Usar URL base de Netlify
    const baseUrl = 'https://polylinesac.netlify.app';
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POLYLINE - ${propertyData.name}</title>
    <link rel="icon" href="${baseUrl}/Resource/Logo/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="${baseUrl}/css/style.css">
    <link rel="stylesheet" href="${baseUrl}/css/property.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="${baseUrl}/Resource/Logo/logo.png" alt="Logo de POLYLINE" class="logo">
            <h1 class="company-name">POLYLINE</h1>
            <p class="slogan">CONSTRUCTORA</p>
        </div>
        <nav>
            <ul class="nav-menu">
                <li><a href="${baseUrl}/index.html">INICIO</a></li>
                <li><a href="${baseUrl}/index.html#para-ti">PARA TI</a></li>
                <li><a href="${baseUrl}/PROYECTOS/proyectos.html">PROYECTOS</a></li>
                <li><a href="${baseUrl}/Contact/Información.html">CONTACTO</a></li>
            </ul>
        </nav>
    </header>

    <main class="property-detail">
        <div class="property-container">
            <div class="image-gallery">
                ${propertyData.images.map((img, index) => `
                    <img src="${img}" alt="${propertyData.name} - Vista ${index + 1}" 
                         class="property-image ${index === 0 ? 'active' : ''}"
                         loading="lazy">
                `).join('')}
            </div>
            
            <div class="property-info">
                <h1>${propertyData.name}</h1>
                <div class="property-stats">
                    <span><i class="fas fa-ruler-combined"></i> ${propertyData.squareMeters}m²</span>
                    <span><i class="fas fa-bed"></i> ${propertyData.bedrooms} Dormitorios</span>
                    <span><i class="fas fa-bath"></i> ${propertyData.bathrooms} Baños</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${propertyData.location}</span>
                </div>
                <div class="property-description">
                    <p>${propertyData.description}</p>
                </div>
                <button class="contact-button" onclick="openContactModal()">
                    Contactar ahora
                </button>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-logo">
            <img src="${baseUrl}/Resource/Logo/logo.png" alt="Logo de POLYLINE">
            <h3>POLYLINE <span class="highlight">CONSTRUCTORA</span></h3>
            <p>Construyendo sueños con pasión y calidad.</p>
        </div>
        <p>&copy; 2025 POLYLINE. Todos los derechos reservados.</p>
    </footer>

    <script src="${baseUrl}/js/property-detail.js"></script>
</body>
</html>`;
}
