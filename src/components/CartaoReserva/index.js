import React, { useCallback } from 'react';

import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import moment from 'moment';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const CartaoReserva = ({
  reserva,
  onPress,
  tipo = 'morador',
  disabled = false,
}) => {
  const dataFormatada = useCallback(
    () => moment(reserva.data, 'DD/MM/YYYY').format('D [de] MMMM [de] YYYY'),
    [reserva.data],
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      style={estilos.container}
      onPress={onPress}>
      <View style={estilos.textContainer}>
        <Text style={estilos.titulo}>{reserva.nomeEspaco}</Text>
        <Text style={estilos.data}>
          Reservado por {tipo === 'morador' ? 'você' : reserva.nomeMorador} para
          o dia {dataFormatada()}
        </Text>
      </View>
      {!disabled && (
        <FontAwesome
          style={{ marginRight: 8 }}
          name="chevron-right"
          size={22}
          color="#7A6428"
        />
      )}
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  container: {
    width: screenWidth - 70,
    height: 96,
    backgroundColor: '#F9F7F3',
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContainer: {},

  titulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    color: '#7a6428',
  },

  data: {
    fontSize: 14,
    fontFamily: 'Ubuntu_300Light',
    color: '#7a6428',
    maxWidth: (screenWidth - 70) * 0.6,
  },
});

export default CartaoReserva;
