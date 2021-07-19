import React, { useState, useEffect } from 'react';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import { fazerLogin } from '../../actions';
import { useDispatch } from 'react-redux';

import CampoTexto from '../../components/CampoTexto';
import BotaoAcao from '../../components/BotaoAcao';
import CampoSenha from '../../components/CampoSenha';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Logo = require('../../../assets/logotipo-texto.png');
const Fundo = require('../../../assets/logotipo.png');

import { mudaValor } from '../../utils';
import { mostrarErroPeloCodigo } from '../../utils/errorHandler';

const Entrar = ({ navigation }) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    email: '',
    senha: '',
    carregando: false,
  });

  const handleAuth = () => {
    const { email, senha } = login;
    setLogin((state) => ({ ...state, carregando: true }));
    dispatch(fazerLogin(email, senha))
      .then(() => navigation.navigate('NavegacaoMorador'))
      .catch((err) =>
        Alert.alert('Erro no login', mostrarErroPeloCodigo(err.code)),
      )
      .then(() =>
        setLogin((state) => ({
          email: '',
          senha: '',
          carregando: false,
        })),
      );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        <View style={estilos.logotipoContainer}>
          <Image source={Logo} style={estilos.logotipo} />
          <Text style={estilos.titulo}>
            Entre com sua conta de morador e começe as reservas!
          </Text>
        </View>
        <View style={estilos.conteudo}>
          <CampoTexto
            placeholder={'Email'}
            value={login.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(valor) => mudaValor('email', valor, setLogin)}
          />
          <CampoSenha
            placeholder={'••••••••'}
            value={login.senha}
            onChangeText={(valor) => mudaValor('senha', valor, setLogin)}
          />
          <BotaoAcao
            primario={true}
            titulo="Entrar"
            onPress={handleAuth}
            carregando={login.carregando}
          />
          <View style={estilos.rodapeContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={estilos.rodapePrimario}>Ainda não tem conta?</Text>
              <Text style={estilos.rodapeSecundario}>Cadastre-se!</Text>
            </TouchableOpacity>
          </View>
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
    height: screenHeight - 400,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,

    paddingTop: 42,
    paddingRight: 35,
    paddingBottom: 42,
    paddingLeft: 35,
  },

  logotipoContainer: {
    width: screenWidth,
    height: 100,
    marginTop: StatusBar.currentHeight + 24,
    height: 200,
    flex: 1,
    alignItems: 'center',
  },

  logotipo: {
    width: 200,
    height: 200,
    marginTop: 32,
    marginBottom: 32,
    resizeMode: 'center',
  },

  titulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_300Light',
    textAlign: 'center',
    maxWidth: 270,
    color: '#7a6428',
  },
  rodapeContainer: {
    flex: 1,
    width: '100%',
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rodapePrimario: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    color: '#C8BC9B',
  },

  rodapeSecundario: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 18,
    color: '#CAB272',
    textAlign: 'center',
  },
});

export default Entrar;
