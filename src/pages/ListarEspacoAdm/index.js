import React, { useState } from 'react';

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

import {
  Modal,
  BotaoAcao,
  CampoTexto,
  CartaoDetalhado,
} from '../../components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const NenhumResultado = require('../../../assets/nenhum_resultado.png');
const Fundo = require('../../../assets/logotipo.png');

const ListarEspacoAdm = ({ navigation }) => {
  const [espacos, setEspacos] = useState([
    {
      id: 'asd09a7sd07y',
      tipo: 'Chalé Completo',
      titulo: 'Chalé Olympus',
      descricaoBreve: 'Cozinha, 2 WCs, Sala e mais',
      capacidade: 30,
      imagem:
        'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',
    },
    {
      id: 'dsafq331fads',
      tipo: 'Chalé Completo',
      titulo: 'Chalé Olympus',
      descricaoBreve: 'Cozinha, 2 WCs, Sala e mais',
      capacidade: 30,
      imagem:
        'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',
    },
    {
      id: '12a3sd654vca',
      tipo: 'Chalé Completo',
      titulo: 'Chalé Olympus',
      descricaoBreve: 'Cozinha, 2 WCs, Sala e mais',
      capacidade: 30,
      imagem:
        'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',
    },
  ]);

  const [resultado, setResultado] = useState([]);

  return (
    <View style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        <View style={estilos.conteudo}>
          <Text style={estilos.descricao}>
            {espacos.length} espaço(s) cadastrado(s)
          </Text>
          {true ? (
            <ScrollView style={estilos.espacosContainer}>
              {espacos.map((espaco) => (
                <CartaoDetalhado
                  key={espaco.id}
                  espaco={espaco}
                  detalhar={(e) =>
                    navigation.navigate('DetalharEspacoAdm', {
                      espacoId: e.id,
                      espacoTitulo: e.titulo,
                    })
                  }
                />
              ))}
            </ScrollView>
          ) : (
            <View style={estilos.nenhumResultadoContainer}>
              <Image
                source={NenhumResultado}
                style={estilos.nenhumResultadoImagem}
              />
              <Text style={estilos.nenhumResultadoTexto}>
                Nenhum resultado com esse nome :(
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
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
    paddingBottom: 82,
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
    fontSize: 14,
    fontFamily: 'Ubuntu_300Light',
    maxWidth: 270,
    color: '#7a6428',
    marginBottom: 16,
  },

  nenhumResultadoContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nenhumResultadoImagem: {
    width: 200,
    height: 140,
    marginBottom: 12,
  },

  nenhumResultadoTexto: {
    width: screenWidth - 70,
    textAlign: 'center',
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 16,
    color: '#958353',
  },
});

export default ListarEspacoAdm;
