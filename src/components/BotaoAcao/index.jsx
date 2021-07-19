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
  style,
  primario = false,
  carregando = false,
  ...rest
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
          ...style,
          backgroundColor: primario ? '#cab272' : '#F3F1EC',
        }}>
        <View style={estilos.botaoTitulo}>
          {carregando ? (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...estilos.titulo,
                  color: primario ? '#fff' : '#cab272',
                }}>
                Carregando...
              </Text>
              <ActivityIndicator color={primario ? '#fff' : '#cab272'} />
            </View>
          ) : (
            <Text
              style={{
                ...estilos.titulo,
                color: primario ? '#fff' : '#cab272',
              }}>
              {titulo}
            </Text>
          )}
        </View>
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTitulo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BotaoAcao;
