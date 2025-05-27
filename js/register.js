import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function registerNewUser(name, email, password) {
    try {
        // Verificar si el email ya existe
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const userData = {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            uid: userCredential.user.uid,
            role: 'user'
        };

        try {
            const userRef = doc(db, "users", userCredential.user.uid);
            await setDoc(userRef, userData);
            
            return {
                success: true,
                user: userCredential.user,
                userData: userData
            };
        } catch (firestoreError) {
            // Si falla Firestore, eliminar el usuario de Authentication
            await userCredential.user.delete();
            throw new Error("Error al guardar datos de usuario");
        }
    } catch (error) {
        let errorMessage = "Error en el registro";
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "Este email ya está registrado";
                break;
            case 'auth/invalid-email':
                errorMessage = "Email inválido";
                break;
            case 'auth/weak-password':
                errorMessage = "La contraseña debe tener al menos 6 caracteres";
                break;
            default:
                errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}
