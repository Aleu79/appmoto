// App.js
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
    const lowerCaseMarca = marca.toLowerCase();
    const marcaRef = ref(database, `motos/${lowerCaseMarca}`);
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
          <Text style={styles.titulo}>MotoApp</Text>
          <Text style={styles.subtitulo}>Ingrese la marca de la moto:</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ducati"
            value={marca}
            onChangeText={setMarca}
          />
          <TouchableOpacity style={styles.botonBuscar} onPress={fetchModelos}>
            <Text style={styles.textoBoton}>Buscar</Text>
          </TouchableOpacity>

          {modelos.length > 0 && (
            <>
              <Text style={styles.subtitulo}>Modelos: </Text>
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
          <Text style={styles.subtitulomoto}>{motoSeleccionada.nombre}</Text>
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
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  titulo: {
    marginTop: '30%',
    marginBottom: '10%',
    fontSize: 50,
    color: '#000000',
    fontWeight: 'bold',
    alignSelf: 'center', 
  },
  subtitulo: {
    fontSize: 20,
    color: 'black',
    marginTop: 30,
    paddingStart: 10,
    marginBottom: 10,
  },
  subtitulomoto: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  entrada: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    padding: 10,
    paddingStart: 20,
    borderRadius: 35,
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  botonBuscar: {
    marginTop: 18,
    backgroundColor: '#66b3ff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textoBoton: {
    fontSize: 18,
  },
  botonModelo: {
    marginTop: 10,
    backgroundColor: '#dfdfdf',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textoModelo: {
    textAlign: 'center',
    fontSize: 16,
  },
  contenedorMoto: {
    width: '70%',
    height: '45%',
    margin: 'auto',
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  textoEspecificacion: {
    fontSize: 18,
    marginVertical: 4,
  },
  botonVolver: {
    marginTop: 25,
    backgroundColor: '#cc0000',
    padding: 10,
    borderRadius: 20,
    width: '50%',
  },
  textoBoton: {
    color: '#f1f1f1',
    textAlign: 'center',
    fontSize: 16,
  },
});
