import { database } from './firebaseConfig';
import { ref, set } from "firebase/database";

const agregarDatos = () => {
  const motosRef = ref(database, 'motos');

  const datosDeMotos = {
    Ducati: {
        nombre: "Ducati Panigale v4s",
        modelo: "Modelo1",
        año: "2024",
        cilindrada: "1000cc",
        color: "Rojo"
      },
      BMW: {
        nombre: "BMW gs",
        modelo: "Model2",
        año: "2024",
        cilindrada: "122cc",
        color: "Azul"
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
