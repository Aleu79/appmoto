import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { database } from './firebaseConfig';
import { ref, get } from "firebase/database";
import agregarDatos from './datos';

export default function App() {
  const [nombreMoto, setNombreMoto] = useState('');
  const [datosMoto, setDatosMoto] = useState(null);

  useEffect(() => {
    agregarDatos(); // Ejecuta el script para agregar datos al iniciar la aplicación
  }, []);

  const obtenerDatosMoto = () => {
    const motoRef = ref(database, `motos/${nombreMoto}`);
    get(motoRef).then((snapshot) => {
      if (snapshot.exists()) {
        setDatosMoto(snapshot.val());
      } else {
        setDatosMoto(null);
        alert('No hay datos disponibles para esta moto');
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={styles.contenedor}>
      <Text>Ingresa el Nombre de la Moto:</Text>
      <TextInput
        style={styles.entrada}
        value={nombreMoto}
        onChangeText={setNombreMoto}
      />
      <Button title="Buscar" onPress={obtenerDatosMoto} />
      {datosMoto && (
        <View style={styles.datosMoto}>
          <Text>Nombre: {datosMoto.nombre}</Text>
          <Text>Modelo: {datosMoto.modelo}</Text>
          <Text>Año: {datosMoto.año}</Text>
          <Text>Cilindrada: {datosMoto.Cilindrada}</Text>
          <Text>Color: {datosMoto.color}</Text>
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
  entrada: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  datosMoto: {
    marginTop: 20,
  },
});
