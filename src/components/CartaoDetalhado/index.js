import React from 'react';

import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const CartaoDetalhado = ({ detalhar, espaco }) => {
  const organizarPalavrasChave = () =>
    espaco.palavrasChave.slice(0, 3).join(', ') + ' e mais.';

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => detalhar(espaco)}
      style={estilos.cartaoContainer}>
      <Image source={{ uri: espaco.fotos[0] }} style={estilos.imagem} />
      <LinearGradient
        colors={['transparent', 'transparent', 'transparent', '#F9F7F3']}
        style={estilos.gradiente}></LinearGradient>
      <View style={estilos.conteudo}>
        <View style={estilos.tituloContainer}>
          <View style={estilos.tagContainer}>
            <Text style={estilos.tag}>{espaco.tipo}</Text>
          </View>
          <Text style={estilos.titulo}>{espaco.nome}</Text>
          <Text style={estilos.descricao}>{organizarPalavrasChave()}</Text>
        </View>
        <View style={estilos.capacidadeContainer}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color="#7A6428"
          />
          <Text style={{ ...estilos.capacidadeTexto, fontSize: 16 }}>
            {espaco.capacidade}
          </Text>
          <Text style={estilos.capacidadeTexto}>Capacidade</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  cartaoContainer: {
    height: 340,
    width: screenWidth - 70,
    backgroundColor: '#F9F7F3',

    borderRadius: 12,
    marginBottom: 24,

    position: 'relative',
    alignItems: 'center',
  },

  gradiente: {
    width: screenWidth - 70,
    height: 230,
    padding: 15,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    top: 0,
  },

  imagem: {
    width: screenWidth - 70,
    height: 230,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  conteudo: {
    width: screenWidth - 70,
    height: 340,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  tituloContainer: {
    width: (screenWidth - 70) * 0.7,
    height: 110,
    padding: 12,
  },

  titulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_500Medium',
    color: '#7A6428',
    marginBottom: 4,
  },

  descricao: {
    fontFamily: 'Ubuntu_300Light',
    color: '#7A6428',
  },

  capacidadeContainer: {
    width: (screenWidth - 70) * 0.3,
    height: 110,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  capacidadeTexto: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#7A6428',
    fontSize: 12,
    marginBottom: 4,
  },

  tagContainer: {
    width: 150,
    height: 22,
    fontSize: 12,
    backgroundColor: '#DCCBA1',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },

  tag: {
    fontFamily: 'Ubuntu_300Light',
    color: '#7A6428',
  },
});

export default CartaoDetalhado;
