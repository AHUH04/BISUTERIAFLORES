import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Registro de usuarios
export const registerUser = async (email, password, userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, "users", userCredential.user.uid), {
            ...userData,
            email: email,
            createdAt: new Date().toISOString()
        });

        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Inicio de sesión actualizado
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Verificar si es admin
        const isAdmin = email === 'admin@polyline.com';
        
        // Obtener datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            // Guardar datos en sessionStorage
            sessionStorage.setItem('userName', userData.name);
        } else {
            sessionStorage.setItem('userName', 'Usuario');
        }

        // Guardar el email para verificaciones
        sessionStorage.setItem('userEmail', email);

        return { 
            success: true, 
            user: userCredential.user,
            isAdmin: isAdmin
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Cerrar sesión
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
