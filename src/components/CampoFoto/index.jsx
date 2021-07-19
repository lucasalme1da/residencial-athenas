import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

const CampoFoto = ({
  fotos,
  limite,
  adicionarFoto,
  rotulo,
  apagarFoto,
  ...rest
}) => {
  return (
    <>
      {rotulo && (
        <Text style={estilos.rotulo}>
          {rotulo}{' '}
          <Text style={{ fontFamily: 'Ubuntu_300Light', color: '#7A642865' }}>
            (máx. {limite})
          </Text>
        </Text>
      )}
      <ScrollView horizontal>
        {fotos.map((foto, idx) => (
          <TouchableOpacity
            style={estilos.imagemContainer}
            onPress={() =>
              Alert.alert(
                'Excluir imagem',
                'Tem certeza que deseja excluir essa imagem?',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'Confirmar',
                    onPress: () => apagarFoto(idx),
                    style: 'cancel',
                  },
                ],
                { cancelable: true },
              )
            }>
            <Image
              key={foto}
              style={estilos.botaoAdicionar}
              source={{ uri: foto }}
            />
          </TouchableOpacity>
        ))}
        {fotos.length < limite && (
          <TouchableOpacity
            style={estilos.botaoAdicionar}
            onPress={adicionarFoto}>
            <Text style={estilos.icone}>+</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const estilos = StyleSheet.create({
  botaoAdicionar: {
    width: 100,
    height: 100,
    backgroundColor: '#f9f7f3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginRight: 12,
  },
  rotulo: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#7A6428',
    marginBottom: 8,
  },
  icone: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#7A642870',
    fontSize: 48,
    marginBottom: 8,
  },
  imagemContainer: {
    width: 100,
    marginBottom: 24,
    marginRight: 12,
    height: 100,
  },
});

export default CampoFoto;
