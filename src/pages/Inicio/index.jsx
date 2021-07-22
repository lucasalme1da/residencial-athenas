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
  BackHandler,
  Alert,
} from 'react-native';

import { CartaoResumido } from '../../components/';

import { useDispatch, useSelector } from 'react-redux';

import { Entypo } from 'react-native-vector-icons';

import * as ImagePicker from 'expo-image-picker';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { listarEspacos } from '../../actions/espacosActions';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Fundo = require('../../../assets/logotipo.png');

const Inicio = ({ navigation }) => {
  const dispatch = useDispatch();
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
          Escolha uma das opções abaixo e começe a usar o app.
        </Text>
      </View>
      <View style={estilos.conteudo}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={estilos.procurar}
          onPress={() => navigation.navigate('Procurar')}>
          <Text style={estilos.procurarTexto}>
            Clique aqui e procure dentre todos os espaços do residencial.
          </Text>
          <Entypo name="magnifying-glass" size={42} color="white" />
        </TouchableOpacity>
        <View style={estilos.espacosContainer}>
          <Text style={estilos.espacosTexto}>
            Confira os espaços recem adicionados:
          </Text>
          <View style={estilos.carousel}>
            <Carousel
              data={[
                {
                  id: 11,
                  imagem:
                    'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',
                  titulo: 'Chalé Olympus',
                  descricaoBreve: 'Cozinha, 2 WCs, Sala de estar',
                  capacidade: 30,
                },
                {
                  id: 21,
                  imagem:
                    'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',

                  titulo: '',
                  descricaoBreve: '',
                  capacidade: 30,
                },
                {
                  id: 31,
                  imagem:
                    'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',

                  titulo: '',
                  descricaoBreve: '',
                  capacidade: 30,
                },
                {
                  id: 41,
                  imagem:
                    'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',

                  titulo: '',
                  descricaoBreve: '',
                  capacidade: 30,
                },
              ]}
              renderItem={({ item }) => {
                return <CartaoResumido item={item} />;
              }}
              onSnapToItem={(index) => setPaginaAtual(index)}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
            />
            {pagination()}
          </View>
        </View>
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

    justifyContent: 'center',
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

export default Inicio;
