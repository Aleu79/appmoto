import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';

const agregarDatos = () => {
  set(ref(database, 'motos/bmw'), {
    1: { nombre: 'S1000RR', modelo: 'Deportivo', año: '2024', motor: '1000cc', color: 'Rojo' },
    2: { nombre: 'R1250GS', modelo: 'Aventura', año: '2024', motor: '1250cc', color: 'Azul' },
    3: { nombre: 'F850GS', modelo: 'Aventura', año: '2024', motor: '850cc', color: 'Negro' }
  });
  set(ref(database, 'motos/ducati'), {
    1: { nombre: 'Panigale V4', modelo: 'Deportivo', año: '2024', motor: '1100cc', color: 'Rojo' },
    2: { nombre: 'Monster 821', modelo: 'Naked', año: '2024', motor: '821cc', color: 'Negro' },
    3: { nombre: 'Scrambler 1100', modelo: 'Scrambler', año: '2024', motor: '1100cc', color: 'Amarillo' }
  });
  set(ref(database, 'motos/honda'), {
    1: { nombre: 'CBR1000RR', modelo: 'Deportivo', año: '2024', motor: '1000cc', color: 'Rojo' },
    2: { nombre: 'Africa Twin', modelo: 'Aventura', año: '2024', motor: '1100cc', color: 'Blanco' },
    3: { nombre: 'CB500X', modelo: 'Aventura', año: '2024', motor: '500cc', color: 'Negro' }
  });
};

export default agregarDatos;
