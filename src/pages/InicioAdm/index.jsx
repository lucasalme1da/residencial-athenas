import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { CartaoResumido } from '../../components/';

import { useSelector } from 'react-redux';

import { Entypo } from 'react-native-vector-icons';

import * as ImagePicker from 'expo-image-picker';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Fundo = require('../../../assets/logotipo.png');

const InicioAdm = ({ navigation }) => {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const usuario = useSelector((state) => state.usuario);

  const saudacao = () => {
    const horaAtual = new Date().getHours();
    if (horaAtual >= 18) return 'Boa noite';
    if (horaAtual >= 12) return 'Boa tarde';
    if (horaAtual >= 0) return 'Bom dia';
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={4}
        activeDotIndex={paginaAtual}
        dotStyle={estilos.paginacao}
        inactiveDotStyle={{
          width: 10,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={{
          height: 70,
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={estilos.fundoContainer} behavior="position">
      <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
      <View style={estilos.tituloContainer}>
        <Text style={estilos.titulo}>
          {saudacao()}, {usuario.nomeCompleto.split(' ')[0]}!
        </Text>
        <Text style={estilos.descricao}>
          Você é um administrador desse aplicativo. Abaixo você pode encontrar
          opções para listar ou adicionar espaços do residencial.
        </Text>
      </View>
      <View style={estilos.conteudo}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={estilos.procurar}
          onPress={() => navigation.navigate('ListarEspacoAdm')}>
          <Text style={estilos.procurarTexto}>
            Veja a lista de espaços cadastrados.
          </Text>
          <Entypo name="magnifying-glass" size={42} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={estilos.procurar}
          onPress={() => navigation.navigate('AdicionarEspacoAdm')}>
          <Text style={estilos.procurarTexto}>Adicione um novo espaço.</Text>
          <Entypo name="add-to-list" size={42} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  fundoContainer: {
    width: screenWidth,
    minHeight: screenHeight,
    backgroundColor: '#f2eee2',
    position: 'relative',
    flex: 1,
    overflow: 'scroll',
  },

  fundoImagem: {
    height: screenHeight,
    position: 'absolute',
    opacity: 0.15,
    alignSelf: 'center',
  },

  tituloContainer: {
    width: screenWidth,
    minHeight: screenHeight * 0.2,
    marginTop: StatusBar.currentHeight + 24,
    padding: 35,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    fontFamily: 'Ubuntu_400Regular',
    textAlign: 'left',
    maxWidth: 270,
    color: '#7a6428',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 16,
    fontFamily: 'Ubuntu_300Light',
    textAlign: 'left',
    maxWidth: 300,
    color: '#7a6428',
  },

  conteudo: {
    width: screenWidth,
    minHeight: screenHeight * 0.7 - (StatusBar.currentHeight + 70),

    alignItems: 'center',
  },

  procurar: {
    width: screenWidth - 70,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#C4A962',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginBottom: 16,
  },

  procurarTexto: {
    fontFamily: 'Ubuntu_400Regular',
    width: screenWidth - 150,
    fontSize: 16,
    color: 'white',
  },

  espacosContainer: {
    width: screenWidth,
    justifyContent: 'center',
    paddingTop: 32,
  },

  espacosTexto: {
    fontFamily: 'Ubuntu_400Regular',
    width: screenWidth,
    paddingHorizontal: 35,
    marginVertical: 12,
    color: '#7A6428',
  },

  carousel: {
    height: 320,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paginacao: {
    width: 20,
    height: 10,
    alignSelf: 'center',
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: '#B09858',
  },

  fotoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 70,
    position: 'relative',
    maxHeight: 40,
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

  navbar: {
    width: screenWidth,
    minHeight: screenHeight * 0.1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
});

export default InicioAdm;
