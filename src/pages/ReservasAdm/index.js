import React, { useState, useEffect } from 'react';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { CartaoReserva } from '../../components';

import { listarTodasReservas } from '../../actions';

import { useDispatch, useSelector } from 'react-redux';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const ReservaCancelada = require('../../../assets/reserva_cancelada.png');
const Fundo = require('../../../assets/logotipo.png');

const ReservasAdm = ({ navigation }) => {
  const dispatch = useDispatch();

  const reservas = useSelector((state) => state.reservas);

  const [carregando, setCarregando] = useState(false);

  const carregarReservas = async () => {
    setCarregando(true);
    await dispatch(listarTodasReservas());
    setCarregando(false);
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        <View style={estilos.logotipoContainer}>
          <Text style={estilos.titulo}>Reservas</Text>
        </View>
        <View style={estilos.conteudo}>
          {reservas.length > 0 ? (
            <>
              <ScrollView style={estilos.reservasContainer}>
                <Text style={estilos.descricao}>
                  Abaixo estão todas as reservas do residencial
                </Text>
                {!carregando &&
                  reservas.map((reserva) => (
                    <CartaoReserva
                      key={reserva.id}
                      reserva={reserva}
                      onPress={() => {}}
                      tipo="admin"
                      disabled
                    />
                  ))}
              </ScrollView>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                height: screenHeight * 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={estilos.descricao}>
                Nenhuma reserva foi realizada!
              </Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  fundoContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#f2eee2',
    position: 'relative',
  },

  fundoImagem: {
    position: 'absolute',
    opacity: 0.15,
    alignSelf: 'center',
  },

  conteudo: {
    width: screenWidth,
    height: screenHeight - 130,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,

    paddingTop: 42,
    paddingRight: 35,
    paddingBottom: 142,
    paddingLeft: 35,

    justifyContent: 'space-between',
  },

  logotipoContainer: {
    width: screenWidth,
    height: 100,
    marginTop: StatusBar.currentHeight + 24,
    height: 200,
    flex: 1,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: 270,
    color: '#7a6428',
  },

  descricao: {
    fontSize: 16,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: screenWidth - 70,
    color: '#7a6428',
    marginBottom: 16,
  },

  reservasContainer: {
    maxHeight: screenHeight * 0.6,
    position: 'relative',
  },

  reserva: {
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

  reservaTextContainer: {},

  reservaTitulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    color: '#7a6428',
  },

  reservaData: {
    fontSize: 14,
    fontFamily: 'Ubuntu_300Light',
    color: '#7a6428',
    maxWidth: (screenWidth - 70) * 0.6,
  },

  modal: {
    height: 330,
    justifyContent: 'space-between',
  },

  modalReservaCancelada: {
    width: screenWidth - 70,
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },

  modalImagem: {
    width: 186,
    height: 128,
    alignSelf: 'center',
  },

  modalTitulo: {
    fontFamily: 'Ubuntu_500Medium',
    width: screenWidth - 70,
    textAlign: 'center',
    fontSize: 16,
    color: '#7a6428',
    paddingBottom: 12,
  },

  modalNomeEspaco: {
    fontFamily: 'Ubuntu_700Bold',
    width: screenWidth - 70,
    fontSize: 20,
    paddingTop: 16,
    color: '#7a6428',
  },

  modalDataContainer: {
    width: screenWidth - 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  modalDataReserva: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 14,
    color: '#7a6428',
  },

  modalTempoRestante: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 14,
    color: '#7a6428',
    opacity: 0.5,
  },

  modalTextoCancelar: {
    fontFamily: 'Ubuntu_300Light',
    width: screenWidth - 70,
    textAlign: 'center',
    color: '#7A6428',
  },

  modalBotaoContainer: {
    width: screenWidth - 70,
  },
});

export default ReservasAdm;
