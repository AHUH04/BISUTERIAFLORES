import { auth } from './firebase-config.js';
import { propertyService } from './propertyService.js';

// Exportar los datos de los inmuebles
export const existingProperties = [
    {
        name: "Casa de Playa del Golf 1",
        image: "/Resource/VENTA/proyecto1.jpg",
        bedrooms: 4,
        bathrooms: 3,
        squareMeters: 250,
        location: "Playa del Golf",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPG1.html"
        }
    },
    {
        name: "Casa de Playa del Golf 2",
        image: "/Resource/VENTA/proyecto2.jpg",
        bedrooms: 3,
        bathrooms: 2,
        squareMeters: 200,
        location: "Playa del Golf",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPG2.html"
        }
    },
    {
        name: "Casa de Playa del Golf 3",
        image: "/Resource/VENTA/proyecto3.jpg",
        bedrooms: 5,
        bathrooms: 4,
        squareMeters: 300,
        location: "Playa del Golf",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPG3.html"
        }
    },
    {
        name: "Casa de Playa del Golf 4",
        image: "/Resource/VENTA/proyecto4.jpg",
        bedrooms: 4,
        bathrooms: 3,
        squareMeters: 280,
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPG4.html"
        }
    },
    {
        name: "Casa de Playa del Golf 5",
        image: "/Resource/VENTA/proyecto5.jpg",
        bedrooms: 3,
        bathrooms: 2,
        squareMeters: 220,
        location: "Playa del Golf",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPG5.html"
        }
    },
    {
        name: "Casa de Playa en Mykonos 1",
        image: "/Resource/VENTA/proyecto6.png",
        bedrooms: 4,
        bathrooms: 3,
        squareMeters: 260,
        location: "Mykonos",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPM1.html"
        }
    },
    {
        name: "Casa de Playa en Mykonos 2",
        image: "/Resource/VENTA/proyecto7.png",
        bedrooms: 3,
        bathrooms: 2,
        squareMeters: 240,
        location: "Mykonos",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPM2.html"
        }
    },
    {
        name: "Casa de Playa",
        image: "/Resource/VENTA/proyectoPLAY.png",
        bedrooms: 4,
        bathrooms: 3,
        squareMeters: 270,
        location: "Playa",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPLAY.html"
        }
    },
    {
        name: "Casa en Playa Lagunas",
        image: "/Resource/VENTA/proyectoLA.png",
        bedrooms: 5,
        bathrooms: 4,
        squareMeters: 320,
        location: "Playa Lagunas",
        type: "Casa de Playa",
        details: {
            url: "/PROYECTOS/CPLAG.html"
        }
    },
    {
        name: "Casa en Surco",
        image: "/Resource/VENTA/proyectoSur.png",
        bedrooms: 4,
        bathrooms: 3,
        squareMeters: 240,
        location: "Surco",
        type: "Casa",
        details: {
            url: "/PROYECTOS/CSUR.html"
        }
    }
];
