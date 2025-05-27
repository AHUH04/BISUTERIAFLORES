import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Si no hay usuario autenticado, redirige al login
        window.location.href = '/pages/login.html';
    }
});
