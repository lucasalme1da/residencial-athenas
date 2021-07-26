import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Modal, BotaoAcao, CartaoReserva } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { deletarReserva, listarReservas } from '../../actions';
import moment from 'moment';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const ReservaCancelada = require('../../../assets/reserva_cancelada.png');
const Fundo = require('../../../assets/logotipo.png');

const Reservas = ({ navigation }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.usuario);
  const reservas = useSelector((state) => state.reservas);

  const [carregando, setCarregando] = useState(false);
  const [reservaAtual, setReservaAtual] = useState({
    status: '',
  });

  const modalRef = useRef(null);

  const abrirModal = (reserva) => {
    setReservaAtual({ status: '', ...reserva });
    modalRef.current?.open();
  };

  const fecharModal = () => {
    modalRef.current?.close();
  };

  const carregarReservas = async () => {
    setCarregando(true);
    await dispatch(listarReservas(uid));
    setCarregando(false);
  };

  const dataFormatada = useCallback(
    () =>
      moment(reservaAtual.data, 'DD/MM/YYYY').format('D [de] MMMM [de] YYYY'),
    [reservaAtual.data],
  );

  const diasRestantes = useCallback(() => {
    if (
      moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY').isSame(
        moment(reservaAtual.data, 'DD/MM/YYYY'),
      )
    )
      return 'hoje';
    return moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY').to(
      moment(reservaAtual.data, 'DD/MM/YYYY'),
    );
  }, [reservaAtual.data]);

  const cancelarReserva = () => {
    dispatch(deletarReserva(reservaAtual.id)).then(() =>
      setReservaAtual((state) => ({ ...state, status: 'cancelada' })),
    );
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
          {carregando ? (
            <View
              style={{
                flex: 1,
                paddingBottom: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={48} color="#CAB272" />
            </View>
          ) : (
            <>
              <ScrollView style={estilos.reservasContainer}>
                <Text style={estilos.descricao}>
                  Abaixo estão suas próximas reservas
                </Text>
                {!carregando &&
                  reservas.map((reserva) => (
                    <CartaoReserva
                      key={reserva.id}
                      reserva={reserva}
                      onPress={() => abrirModal(reserva)}
                    />
                  ))}
              </ScrollView>
              <BotaoAcao
                primario={true}
                titulo="Fazer uma nova reserva"
                onPress={() => navigation.navigate('Inicio')}
              />
            </>
          )}
        </View>
        <Modal modalRef={modalRef} altura={400}>
          <View style={estilos.modal}>
            {reservaAtual.status === 'cancelada' ? (
              <View style={estilos.modalReservaCancelada}>
                <Image source={ReservaCancelada} style={estilos.modalImagem} />
                <Text style={estilos.reservaTitulo}>
                  Reserva cancelada com sucesso.
                </Text>
                <View style={estilos.modalBotaoContainer}>
                  <BotaoAcao titulo="Fechar" onPress={fecharModal} />
                </View>
              </View>
            ) : (
              <>
                <View>
                  <Text style={estilos.modalTitulo}>Você reservou</Text>
                  <Text style={estilos.modalNomeEspaco}>
                    {reservaAtual.nomeEspaco}
                  </Text>
                  <View style={estilos.modalDataContainer}>
                    <Text style={estilos.modalDataReserva}>
                      para {dataFormatada()}
                    </Text>
                    <Text style={estilos.modalTempoRestante}>
                      {diasRestantes()}
                    </Text>
                  </View>
                </View>
                <View style={estilos.modalBotaoContainer}>
                  {diasRestantes() !== 'hoje' ? (
                    <>
                      <Text style={estilos.modalTextoCancelar}>
                        Gostaria de cancelar sua reserva?
                      </Text>
                      <BotaoAcao
                        titulo="Cancelar reserva"
                        onPress={() =>
                          Alert.alert(
                            'Cancelar reserva',
                            'Tem certeza que quer cancelar sua reserva?',
                            [
                              {
                                text: 'Voltar',
                                style: 'cancel',
                              },
                              {
                                text: 'Confirmar',
                                onPress: cancelarReserva,
                                style: 'cancel',
                              },
                            ],
                          )
                        }
                        primario
                      />
                      <BotaoAcao titulo="Voltar" onPress={fecharModal} />
                    </>
                  ) : (
                    <>
                      <Text style={estilos.modalTextoCancelar}>
                        O prazo para cancelar essa reserva expirou.
                      </Text>
                      <BotaoAcao titulo="Voltar" onPress={fecharModal} />
                    </>
                  )}
                </View>
              </>
            )}
          </View>
        </Modal>
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

  reservaTitulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: screenWidth - 70,
    color: '#7a6428',
  },

  descricao: {
    fontSize: 16,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: 270,
    color: '#7a6428',
    marginBottom: 16,
  },

  reservasContainer: {
    maxHeight: screenHeight * 0.5,
    position: 'relative',
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

export default Reservas;
