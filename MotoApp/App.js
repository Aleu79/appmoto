import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { database } from './firebaseConfig';
import { ref, get } from "firebase/database";
import agregarDatos from './datos';

export default function App() {
  const [marca, setMarca] = useState('');
  const [modelos, setModelos] = useState([]);
  const [motoSeleccionada, setMotoSeleccionada] = useState(null);

  useEffect(() => {
    agregarDatos(); // Ejecuta el script para agregar datos al iniciar la aplicación
  }, []);

  const fetchModelos = () => {
    const marcaRef = ref(database, `motos/${marca}`);
    get(marcaRef).then((snapshot) => {
      if (snapshot.exists()) {
        setModelos(Object.values(snapshot.val()));
      } else {
        alert('No hay datos disponibles para esta marca');
        setModelos([]);
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const mostrarMoto = (moto) => {
    setMotoSeleccionada(moto);
  };

  return (
    <View style={styles.contenedor}>
      {!motoSeleccionada ? (
        <>
          <Text style={styles.titulo}>Ingrese la Marca de la Moto</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Marca de la Moto"
            value={marca}
            onChangeText={setMarca}
          />
          <TouchableOpacity style={styles.botonBuscar} onPress={fetchModelos}>
            <Text style={styles.textoBoton}>Buscar</Text>
          </TouchableOpacity>

          {modelos.length > 0 && (
            <>
              <Text style={styles.titulo}>Modelos de {marca}</Text>
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
          <Text style={styles.textoEspecificacion}>Modelo: {motoSeleccionada.modelo}</Text>
          <Text style={styles.textoEspecificacion}>Año: {motoSeleccionada.año}</Text>
          <Text style={styles.textoEspecificacion}>Motor: {motoSeleccionada.motor}</Text>
          <Text style={styles.textoEspecificacion}>Color: {motoSeleccionada.color}</Text>
          <TouchableOpacity style={styles.botonVolver} onPress={() => setMotoSeleccionada(null)}>
            <Text style={styles.textoBoton}>Volver</Text>
          </TouchableOpacity>
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
  entrada: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  botonBuscar: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
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
  textoEspecificacion: {
    fontSize: 16,
    marginVertical: 4,
  },
  botonVolver: {
    marginTop: 20,
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
