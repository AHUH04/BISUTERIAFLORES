// Configuración de las APIs
const googleClientId = 'TU_GOOGLE_CLIENT_ID'; // Reemplazar con tu ID de cliente
const facebookAppId = 'TU_FACEBOOK_APP_ID'; // Reemplazar con tu App ID

// Inicializar Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
    });
};

// Función para manejar la respuesta de Google
function handleGoogleResponse(response) {
    const credential = response.credential;
    const decodedToken = JSON.parse(atob(credential.split('.')[1]));
    
    showSocialLoginForm(
        'Google',
        decodedToken.email,
        '/Login/Logos/google-icon.png'
    );
}

// Inicializar Google Sign In
function initializeGoogle() {
    google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleResponse
    });

    const googleBtn = document.getElementById('googleBtn');
    googleBtn.addEventListener('click', () => {
        google.accounts.id.prompt();
    });
}

// Función para login con Facebook
function handleFacebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', {fields: 'email'}, function(userData) {
                showSocialLoginForm(
                    'Facebook',
                    userData.email,
                    '/Login/Logos/facebook-icon.png'
                );
            });
        } else {
            console.log('Usuario canceló el login o no autorizó la aplicación.');
        }
    }, {scope: 'public_profile,email'});
}

function showSocialLoginForm(provider, email, iconSrc) {
    const loginForm = document.getElementById('loginForm');
    const socialForm = document.getElementById('socialLoginForm');
    const socialTitle = document.getElementById('socialLoginTitle');
    const socialEmail = document.getElementById('socialLoginEmail');
    const providerIcon = document.getElementById('socialProviderIcon');

    // Actualizar contenido
    socialTitle.textContent = `Iniciando sesión con ${provider}`;
    socialEmail.textContent = email;
    providerIcon.src = iconSrc;

    // Cambiar formularios con animación
    loginForm.style.display = 'none';
    socialForm.style.display = 'block';
    setTimeout(() => {
        socialForm.classList.add('fade-in');
    }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    // Animación del logo y título
    anime.timeline({
        easing: 'easeOutExpo',
    })
    .add({
        targets: '.login-logo',
        scale: [0, 1],
        rotate: '1turn',
        duration: 1200,
        opacity: [0, 1]
    })
    .add({
        targets: '.company-name',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        delay: 100,
        complete: function(anim) {
            document.querySelector('.company-name').classList.add('gradient-animation');
        }
    });

    // Inicializar Google Sign In
    initializeGoogle();
    
    // Animación inicial de las formas geométricas
    anime({
        targets: '.shape',
        scale: [0, 1],
        rotate: [45, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .8)'
    });

    // Animación del contenido del login
    anime({
        targets: '.login-content',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 500,
        easing: 'easeOutCubic'
    });

    // Animación hover del botón
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('mouseenter', () => {
        anime({
            targets: '.btn-line',
            scaleX: [0, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    loginBtn.addEventListener('mouseleave', () => {
        anime({
            targets: '.btn-line',
            scaleX: [1, 0],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    // Manejo del formulario
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('error-message');

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                errorElement.style.color = '#4CAF50';
                errorElement.textContent = '¡Login exitoso! Redirigiendo...';
                
                // Guardar el nombre del usuario
                if (result.userData && result.userData.name) {
                    sessionStorage.setItem('userName', result.userData.name);
                }
                
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            } else {
                errorElement.style.color = '#ff0000';
                errorElement.textContent = result.error;
            }
        } catch (error) {
            errorElement.style.color = '#4CAF50';
            errorElement.textContent = 'Cargando...';
        }
    });

    // Manejar el botón de continuar
    document.getElementById('continueWithSocial').addEventListener('click', () => {
        // Aquí irá la lógica de autenticación final
        console.log('Continuando con login social...');
        // Ejemplo: window.location.href = '/dashboard';
    });

    // Manejar el botón de volver
    document.getElementById('backToLogin').addEventListener('click', () => {
        const loginForm = document.getElementById('loginForm');
        const socialForm = document.getElementById('socialLoginForm');
        
        socialForm.classList.remove('fade-in');
        socialForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', () => {
        const container = document.querySelector('.toggle-buttons');
        container.dataset.active = 'login';
        
        document.getElementById('loginForm').classList.add('active-form');
        document.getElementById('registerForm').classList.remove('active-form');
        document.getElementById('showLogin').classList.add('active');
        document.getElementById('showRegister').classList.remove('active');
    });

    document.getElementById('showRegister').addEventListener('click', () => {
        const container = document.querySelector('.toggle-buttons');
        container.dataset.active = 'register';
        
        document.getElementById('registerForm').classList.add('active-form');
        document.getElementById('loginForm').classList.remove('active-form');
        document.getElementById('showRegister').classList.add('active');
        document.getElementById('showLogin').classList.remove('active');
    });

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const errorElement = document.getElementById('reg-error-message');
    
        // Validaciones básicas
        if (!name || !email || !password) {
            errorElement.textContent = "Todos los campos son obligatorios";
            return;
        }
    
        if (password.length < 6) {
            errorElement.textContent = "La contraseña debe tener al menos 6 caracteres";
            return;
        }
    
        try {
            const result = await registerNewUser(name, email, password);
            if (result.success) {
                errorElement.style.color = '#4CAF50';
                errorElement.textContent = '¡Registro exitoso! Redirigiendo...';
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            } else {
                errorElement.style.color = '#ff0000';
                errorElement.textContent = result.error;
            }
        } catch (error) {
            errorElement.style.color = '#ff0000';
            errorElement.textContent = error.message;
        }
    });

    // Llamar a la función cuando se carga la página
    createParticles();
});

// Función para crear partículas
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numberOfParticles = 50; // Aumentamos el número de partículas
    
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición inicial aleatoria
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Retraso aleatorio para la animación
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Actualizar partículas al cambiar el tamaño de la ventana
window.addEventListener('resize', createParticles);

const showLogin = () => {
    document.getElementById('loginForm').style.transform = 'translateX(0)';
    document.getElementById('registerForm').style.transform = 'translateX(100%)';
    // Reiniciar las animaciones de los inputs
    document.querySelectorAll('#loginForm .input-group').forEach(input => {
        input.style.animation = 'none';
        input.offsetHeight; // Trigger reflow
        input.style.animation = null;
    });
};

const showRegister = () => {
    document.getElementById('loginForm').style.transform = 'translateX(-100%)';
    document.getElementById('registerForm').style.transform = 'translateX(0)';
    // Reiniciar las animaciones de los inputs
    document.querySelectorAll('#registerForm .input-group').forEach(input => {
        input.style.animation = 'none';
        input.offsetHeight; // Trigger reflow
        input.style.animation = null;
    });
};
