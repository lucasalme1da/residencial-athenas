import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const BotaoAcao = ({
  titulo,
  onPress,
  primario = false,
  carregando = false,
}) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#ffffff20')}
      style={{
        ...estilos.botaoContainer,
      }}
      onPress={onPress}>
      <View
        style={{
          ...estilos.botaoContainer,
          backgroundColor: primario ? '#cab272' : '#fff',
        }}>
        <Text
          style={{
            ...estilos.botaoTitulo,
            color: primario ? '#fff' : '#cab272',
          }}>
          {carregando ? (
            <View style={estilos.botaoTitulo}>
              <Text
                style={{
                  ...estilos.botaoTitulo,
                  color: primario ? '#fff' : '#cab272',
                }}>
                Carregando...
              </Text>
              <ActivityIndicator color={primario ? '#fff' : '#cab272'} />
            </View>
          ) : (
            titulo
          )}
        </Text>
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

    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTitulo: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BotaoAcao;
