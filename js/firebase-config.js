import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBYAjRrl3d5nSYqSUnvE1zYG9sDW6lu7YM",
    authDomain: "polyline-8476e.firebaseapp.com",
    projectId: "polyline-8476e",
    storageBucket: "polyline-8476e.firebasestorage.app",
    messagingSenderId: "845208967834",
    appId: "1:845208967834:web:51c4249e86a988e45a5d23",
    measurementId: "G-QEFDKVQPBW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Agregar función de redirección al perfil
export function checkAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = '/Login/login.html';
        }
    });
}