import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { database } from './firebaseConfig';
import { ref, get } from "firebase/database";
import agregarDatos from './datos';

export default function App() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [motoSeleccionada, setMotoSeleccionada] = useState(null);
  const [añoMoto, setAñoMoto] = useState('');

  useEffect(() => {
    agregarDatos(); // Ejecuta el script para agregar datos al iniciar la aplicación
    fetchMarcas();
  }, []);

  const fetchMarcas = () => {
    const motosRef = ref(database, 'motos');
    get(motosRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMarcas(Object.keys(snapshot.val()));
      } else {
        alert('No hay datos disponibles');
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const fetchModelos = (marca) => {
    const marcaRef = ref(database, `motos/${marca}`);
    get(marcaRef).then((snapshot) => {
      if (snapshot.exists()) {
        setModelos(Object.values(snapshot.val()));
      } else {
        alert('No hay datos disponibles para esta marca');
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const mostrarMoto = (moto) => {
    setMotoSeleccionada(moto);
  };

  const obtenerAñoMoto = () => {
    if (motoSeleccionada) {
      alert(`El año de la moto ${motoSeleccionada.nombre} es ${motoSeleccionada.año}`);
    } else {
      alert('No has seleccionado una moto');
    }
  };

  return (
    <View style={styles.contenedor}>
      {!motoSeleccionada ? (
        <>
          <Text style={styles.titulo}>Marcas de Motos</Text>
          <FlatList
            data={marcas}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.botonMarca} onPress={() => fetchModelos(item)}>
                <Text style={styles.textoMarca}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />

          {modelos.length > 0 && (
            <>
              <Text style={styles.titulo}>Modelos de {modelos[0].marca}</Text>
              <FlatList
                data={modelos}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.botonModelo} onPress={() => mostrarMoto(item)}>
                    <Text style={styles.textoModelo}>{item.nombre}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.nombre}
              />
            </>
          )}
        </>
      ) : (
        <View style={styles.contenedorMoto}>
          <Text style={styles.titulo}>{motoSeleccionada.nombre}</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ingrese el año de la moto"
            value={añoMoto}
            onChangeText={setAñoMoto}
          />
          <Button title="Ver Año" onPress={obtenerAñoMoto} />
          <Button title="Volver" onPress={() => setMotoSeleccionada(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  botonMarca: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  textoMarca: {
    textAlign: 'center',
    fontSize: 16,
  },
  botonModelo: {
    backgroundColor: 'lightgreen',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  textoModelo: {
    textAlign: 'center',
    fontSize: 16,
  },
  contenedorMoto: {
    alignItems: 'center',
  },
  entrada: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
});
