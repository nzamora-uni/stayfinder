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