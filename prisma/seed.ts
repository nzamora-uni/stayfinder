import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

const alojamientos = [
  {
    titulo: "Cabaña frente al lago",
    ubicacion: "Pátzcuaro, Michoacán",
    tipo: "Cabaña",
    precio: 1250,
    calificacion: 4.8,
    huespedes: 4,
    imagen:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    descripcion:
      "Una cabaña tranquila con vista directa al lago.",
    amenidades: ["Wi-Fi", "Cocina", "Estacionamiento"]
  },
  {
    titulo: "Departamento en el centro",
    ubicacion: "Morelia, Michoacán",
    tipo: "Departamento",
    precio: 900,
    calificacion: 4.5,
    huespedes: 2,
    imagen:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    descripcion:
      "Departamento moderno cerca del centro histórico.",
    amenidades: ["Wi-Fi", "Televisión", "Cocina"]
  },
  {
    titulo: "Casa con alberca",
    ubicacion: "Cuernavaca, Morelos",
    tipo: "Casa",
    precio: 2400,
    calificacion: 4.9,
    huespedes: 8,
    imagen:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    descripcion:
      "Casa amplia para familias con alberca privada.",
    amenidades: ["Alberca", "Jardín", "Estacionamiento"]
  },
  {
    titulo: "Loft minimalista",
    ubicacion: "Ciudad de México, CDMX",
    tipo: "Loft",
    precio: 1800,
    calificacion: 4.6,
    huespedes: 2,
    imagen:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    descripcion:
      "Loft de diseño en la Roma Norte, ideal para viajes de negocios.",
    amenidades: ["Wi-Fi", "Escritorio", "Gimnasio"]
  },
  {
    titulo: "Villa frente al mar",
    ubicacion: "Puerto Vallarta, Jalisco",
    tipo: "Villa",
    precio: 5200,
    calificacion: 4.95,
    huespedes: 10,
    imagen:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    descripcion:
      "Villa de lujo con acceso directo a la playa y alberca infinita.",
    amenidades: ["Alberca", "Vista al mar", "Aire acondicionado", "Estacionamiento"]
  },
  {
    titulo: "Estudio económico",
    ubicacion: "Guadalajara, Jalisco",
    tipo: "Estudio",
    precio: 450,
    calificacion: 4.1,
    huespedes: 1,
    imagen:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    descripcion:
      "Estudio compacto y funcional, perfecto para estancias cortas.",
    amenidades: ["Wi-Fi", "Cocina"]
  },
  {
    titulo: "Cabaña en el bosque",
    ubicacion: "Valle de Bravo, Estado de México",
    tipo: "Cabaña",
    precio: 1600,
    calificacion: 4.7,
    huespedes: 6,
    imagen:
      "https://images.unsplash.com/photo-1518602164578-cd0074062767",
    descripcion:
      "Cabaña rústica rodeada de pinos, ideal para desconectarse.",
    amenidades: ["Chimenea", "Wi-Fi", "Estacionamiento"]
  },
  {
    titulo: "Penthouse con terraza",
    ubicacion: "Monterrey, Nuevo León",
    tipo: "Departamento",
    precio: 3100,
    calificacion: 4.85,
    huespedes: 5,
    imagen:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    descripcion:
      "Penthouse con terraza privada y vista panorámica de la ciudad.",
    amenidades: ["Terraza", "Wi-Fi", "Gimnasio", "Estacionamiento"]
  },
  {
    titulo: "Casa colonial",
    ubicacion: "San Miguel de Allende, Guanajuato",
    tipo: "Casa",
    precio: 2100,
    calificacion: 4.4,
    huespedes: 6,
    imagen:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    descripcion:
      "Casa de estilo colonial en el centro histórico, con patio interior.",
    amenidades: ["Patio", "Wi-Fi", "Cocina"]
  }
];

async function main() {
  await prisma.property.deleteMany();

  await prisma.property.createMany({
    data: alojamientos
  });

  console.log("Alojamientos registrados correctamente");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });