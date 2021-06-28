import React from 'react';
import { StyleSheet, TouchableNativeFeedback, Text, View } from 'react-native';

const BotaoAcao = ({ titulo, onPress }) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#ffffff20')}
      style={estilos.botaoContainer}
      onPress={onPress}>
      <View style={estilos.botaoContainer}>
        <Text style={estilos.botaoTitulo}>{titulo}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const estilos = StyleSheet.create({
  botaoContainer: {
    fontFamily: 'Ubuntu_400Regular',
    maxWidth: 340,
    minWidth: 'auto',
    height: 48,
    backgroundColor: '#cab272',
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTitulo: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BotaoAcao;
