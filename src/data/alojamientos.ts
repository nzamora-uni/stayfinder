export type Alojamiento = {
  id: number;
  titulo: string;
  ubicacion: string;
  tipo: string;
  precio: number;
  calificacion: number;
  huespedes: number;
  imagen: string;
};

export const alojamientos: Alojamiento[] = [
  {
    id: 1,
    titulo: "Cabaña frente al lago",
    ubicacion: "Pátzcuaro, Michoacán",
    tipo: "Cabaña",
    precio: 1250,
    calificacion: 4.8,
    huespedes: 4,
    imagen:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
  },
  {
    id: 2,
    titulo: "Departamento en el centro",
    ubicacion: "Morelia, Michoacán",
    tipo: "Departamento",
    precio: 900,
    calificacion: 4.5,
    huespedes: 2,
    imagen:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    id: 3,
    titulo: "Casa con alberca",
    ubicacion: "Cuernavaca, Morelos",
    tipo: "Casa",
    precio: 2400,
    calificacion: 4.9,
    huespedes: 8,
    imagen:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
  },
  {
    id: 4,
    titulo: "Loft moderno",
    ubicacion: "Ciudad de México",
    tipo: "Loft",
    precio: 1650,
    calificacion: 4.7,
    huespedes: 3,
    imagen:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    id: 5,
    titulo: "Casa colonial",
    ubicacion: "San Miguel de Allende, Guanajuato",
    tipo: "Casa",
    precio: 2100,
    calificacion: 4.9,
    huespedes: 6,
    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    id: 6,
    titulo: "Departamento cerca de la playa",
    ubicacion: "Cancún, Quintana Roo",
    tipo: "Departamento",
    precio: 1800,
    calificacion: 4.6,
    huespedes: 4,
    imagen:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  }
];
