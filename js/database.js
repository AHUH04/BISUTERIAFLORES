import { db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc, 
    updateDoc, 
    deleteDoc 
} from "firebase/firestore";

// Agregar proyecto
export const addProject = async (projectData) => {
    try {
        const docRef = await addDoc(collection(db, "projects"), {
            ...projectData,
            createdAt: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Obtener todos los proyectos
export const getProjects = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projects = [];
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, projects };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Agregar cita
export const addAppointment = async (appointmentData) => {
    try {
        const docRef = await addDoc(collection(db, "appointments"), {
            ...appointmentData,
            createdAt: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Agregar contacto
export const addContact = async (contactData) => {
    try {
        const docRef = await addDoc(collection(db, "contacts"), {
            ...contactData,
            createdAt: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
