import React, { useRef } from 'react';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { Modal, BotaoAcao } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { fazerLogout } from '../../actions';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Fundo = require('../../../assets/logotipo.png');

const Conta = ({ navigation }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);

  const modalRef = useRef(null);

  const abrirModal = () => {
    modalRef.current?.open();
  };

  const fecharModal = () => {
    modalRef.current?.close();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        <View style={estilos.logotipoContainer}>
          <Text style={estilos.titulo}>Conta</Text>
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.fotoContainer}>
            <TouchableOpacity style={estilos.fotoBotao} onPress={() => {}}>
              {false ? (
                <Image style={estilos.foto} source={{ uri: '' }} />
              ) : (
                <Text style={estilos.iniciais}>LA</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={estilos.dadosContainer}>
            <View>
              <Text style={{ ...estilos.nome, marginBottom: 4 }}>
                {usuario.nomeCompleto}
              </Text>
              <Text style={estilos.apto}>
                Morador(a) do {usuario.predio}
                {usuario.apartamento}
              </Text>
            </View>
            <Text style={estilos.email}>
              Você está logado(a) com o email{' '}
              <Text style={{ fontWeight: 'bold' }}>{usuario.email}</Text>
            </Text>
          </View>
          <BotaoAcao primario titulo="Sair da conta" onPress={abrirModal} />
        </View>
        <Modal modalRef={modalRef} altura={320}>
          <View style={estilos.modalLogoutContainer}>
            <Text style={estilos.modalTexto}>
              Tem certeza que deseja sair da sua conta?
            </Text>
            <View style={estilos.modalBotaoContainer}>
              <BotaoAcao
                titulo="Confirmar"
                onPress={() => {
                  dispatch(fazerLogout())
                    .then(() => {
                      fecharModal();
                      navigation.navigate('Entrar');
                    })
                    .catch((err) => console.log(err));
                }}
                primario
              />
              <BotaoAcao titulo="Cancelar" onPress={fecharModal} />
            </View>
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
    height: screenHeight - 300,
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

  iniciais: {
    fontSize: 32,
    fontFamily: 'Ubuntu_500Medium',
    color: '#7a6428',
  },

  dadosContainer: {
    height: screenHeight * 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nome: {
    fontSize: 28,
    fontFamily: 'Ubuntu_500Medium',
    color: '#7a6428',
    textAlign: 'center',
  },

  apto: {
    fontSize: 18,
    fontFamily: 'Ubuntu_300Light',
    color: '#7a6428',
    textAlign: 'center',
  },

  email: {
    fontSize: 14,
    fontFamily: 'Ubuntu_300Light',
    maxWidth: screenWidth * 0.6,
    color: '#7a6428',
    textAlign: 'center',
  },

  fotoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 70,
    position: 'relative',
    maxHeight: 10,
  },

  fotoBotao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    width: 120,
    height: 120,
    borderWidth: 5,
    borderColor: '#F9F7F3',
    borderRadius: 100,
    backgroundColor: '#D8C799',
    position: 'absolute',
    top: -100,
  },

  foto: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },

  modalLogoutContainer: {
    width: screenWidth - 70,
    height: 250,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTexto: {
    width: screenWidth * 0.6,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#7a6428',
    paddingVertical: 32,
  },

  modalBotaoContainer: {
    width: screenWidth - 70,
  },
});

export default Conta;
