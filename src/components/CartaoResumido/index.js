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

const CartaoResumido = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={(e) => console.log(e)}
      style={estilos.cartaoContainer}>
      <Image source={{ uri: item.imagem }} style={estilos.imagem} />
      <LinearGradient
        colors={['transparent', 'transparent', '#7A6428']}
        style={estilos.gradiente}></LinearGradient>
      <View style={estilos.conteudo}>
        <View style={estilos.tituloContainer}>
          <Text style={estilos.titulo}>{item.titulo}</Text>
          <Text style={estilos.descricao}>{item.descricaoBreve}</Text>
        </View>
        <View style={estilos.capacidadeContainer}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color="white"
          />
          <Text style={estilos.capacidadeTexto}>{item.capacidade}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  cartaoContainer: {
    height: 250,
    width: screenWidth - 70,
    backgroundColor: '#7A6428',

    marginLeft: 35,
    marginRight: 35,
    borderRadius: 12,

    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  gradiente: {
    width: screenWidth - 70,
    height: 250,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    position: 'absolute',
  },

  imagem: {
    width: screenWidth - 70,
    height: 250,
    borderRadius: 12,
  },

  conteudo: {
    width: screenWidth - 70,
    height: 250,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  tituloContainer: {
    width: (screenWidth - 70) * 0.8,
    padding: 12,
  },

  titulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_500Medium',
    color: 'white',
    marginBottom: 4,
  },

  descricao: {
    fontFamily: 'Ubuntu_400Regular',
    color: 'white',
  },

  capacidadeContainer: {
    width: (screenWidth - 70) * 0.2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  capacidadeTexto: {
    fontFamily: 'Ubuntu_700Bold',
    color: 'white',
  },
});

export default CartaoResumido;
