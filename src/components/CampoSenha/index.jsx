import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const CampoSenha = ({ onChangeText, value, placeholder, rotulo }) => {
  const [esconder, setEsconder] = useState(true);

  return (
    <>
      {rotulo && <Text style={estilos.rotulo}>{rotulo}</Text>}
      <View style={estilos.container}>
        <TextInput
          style={estilos.campo}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={esconder}
          passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
        />
        <MaterialCommunityIcons
          style={estilos.iconeOlho}
          name={value.trim() !== '' && (esconder ? 'eye-off' : 'eye')}
          size={24}
          onPress={() => setEsconder(!esconder)}
        />
      </View>
    </>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },

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

  iconeOlho: {
    width: 32,
    height: 32,
    color: '#7A6428',
    right: 0,
    position: 'absolute',
    top: 24,
    marginRight: 8,
  },

  rotulo: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#7A6428',
    marginBottom: 8,
  },
});

export default CampoSenha;
