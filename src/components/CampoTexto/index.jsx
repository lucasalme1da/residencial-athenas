import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CampoTexto = ({ onChangeText, value, placeholder }) => {
  return (
    <TextInput
      style={estilos.campo}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
};

const estilos = StyleSheet.create({
  campo: {
    maxWidth: 340,
    minWidth: 'auto',
    height: 48,
    backgroundColor: '#f9f7f3',
    borderRadius: 8,
    paddingLeft: 16,
    color: '#7a6428',
    marginBottom: 20,
  },
});

export default CampoTexto;
