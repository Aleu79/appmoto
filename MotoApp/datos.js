import { database } from './firebaseConfig';
import { ref, set } from "firebase/database";

const agregarDatos = () => {
  const motosRef = ref(database, 'motos');

  const datosDeMotos = {
    Ducati: {
      Moto1: {
        nombre: "Ducati Panigale V4",
        modelo: "Panigale V4",
        año: "2020",
        motor: "1100cc",
        color: "Rojo"
      },
      Moto2: {
        nombre: "Ducati Monster 821",
        modelo: "Monster 821",
        año: "2021",
        motor: "821cc",
        color: "Negro"
      },
      Moto3: {
        nombre: "Ducati Multistrada 950",
        modelo: "Multistrada 950",
        año: "2022",
        motor: "937cc",
        color: "Blanco"
      }
    },
    BMW: {
      Moto1: {
        nombre: "BMW S1000RR",
        modelo: "S1000RR",
        año: "2020",
        motor: "999cc",
        color: "Azul"
      },
      Moto2: {
        nombre: "BMW R1250GS",
        modelo: "R1250GS",
        año: "2021",
        motor: "1254cc",
        color: "Amarillo"
      },
      Moto3: {
        nombre: "BMW F900R",
        modelo: "F900R",
        año: "2022",
        motor: "895cc",
        color: "Rojo"
      }
    }
  };

  set(motosRef, datosDeMotos)
    .then(() => {
      console.log('Datos agregados exitosamente');
    })
    .catch((error) => {
      console.error('Error al agregar datos: ', error);
    });
};

export default agregarDatos;
