import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const CampoTexto = ({
  onChangeText,
  value,
  placeholder,
  rotulo,
  style,
  ...rest
}) => {
  return (
    <View style={{ flex: 1, maxHeight: 92 }}>
      {rotulo && <Text style={estilos.rotulo}>{rotulo}</Text>}

      <TextInput
        style={{ ...estilos.campo, ...style }}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#95835370"
        multiline
        {...rest}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  campo: {
    fontFamily: 'Ubuntu_400Regular',
    maxWidth: 340,
    minWidth: 'auto',
    height: 48,
    backgroundColor: '#f9f7f3',
    borderRadius: 8,
    paddingLeft: 16,
    color: '#7a6428',
    marginBottom: 16,
  },
  rotulo: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#7A6428',
    marginBottom: 8,
  },
});

export default CampoTexto;
