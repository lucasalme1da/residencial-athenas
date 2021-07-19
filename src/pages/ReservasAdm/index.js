import React, { useState, useEffect, useRef } from 'react';

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
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Modal, BotaoAcao } from '../../components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const ReservaCancelada = require('../../../assets/reserva_cancelada.png');
const Fundo = require('../../../assets/logotipo.png');

const ReservasAdm = ({ navigation }) => {
  const [reservaAtual, setReservaAtual] = useState({
    status: 'fonfon',
  });

  const modalRef = useRef(null);

  const abrirModal = (reserva) => {
    modalRef.current?.open();
  };

  const fecharModal = () => {
    modalRef.current?.close();
  };

  const reserva = {
    titulo: 'Chalé Olympus',
    data: new Date(),
  };

  const formatarData = (data) => {
    return '4 de Março de 2022';
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        <View style={estilos.logotipoContainer}>
          <Text style={estilos.titulo}>Reservas</Text>
        </View>
        <View style={estilos.conteudo}>
          <ScrollView style={estilos.reservasContainer}>
            <Text style={estilos.descricao}>
              Abaixo estão todas as reservas do residencial
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={estilos.reserva}
              onPress={() => abrirModal({ id: 1 })}>
              <View style={estilos.reservaTextContainer}>
                <Text style={estilos.reservaTitulo}>{reserva.titulo}</Text>
                <Text style={estilos.reservaData}>
                  Reservado por Lazslo para o dia {formatarData(reserva.data)}
                </Text>
              </View>
              <FontAwesome
                style={{ marginRight: 8 }}
                name="chevron-right"
                size={22}
                color="#7A6428"
              />
            </TouchableOpacity>
          </ScrollView>
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
                  <Text style={estilos.modalNomeEspaco}>Chalé Olympus</Text>
                  <View style={estilos.modalDataContainer}>
                    <Text style={estilos.modalDataReserva}>
                      para 4 de março de 2022
                    </Text>
                    <Text style={estilos.modalTempoRestante}>
                      daqui dois dias
                    </Text>
                  </View>
                </View>
                <View style={estilos.modalBotaoContainer}>
                  {true ? ( // Lógica para verificar se a reserva pode ou não ser cancelada
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
                                onPress: () => {},
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

  descricao: {
    fontSize: 16,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: screenWidth - 70,
    color: '#7a6428',
    marginBottom: 16,
  },

  reservasContainer: {
    maxHeight: screenHeight * 0.5,
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
