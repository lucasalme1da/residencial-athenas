import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { cadastrarNovoUsuario, setNovoUsuario } from '../../actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'expo-image-picker';

import { CampoFoto, CampoSenha, CampoTexto, BotaoAcao } from '../../components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

import { mudaValor } from '../../utils';

const Fundo = require('../../../assets/logotipo.png');

const EditarEspacoAdm = ({ navigation }) => {
  const [passo, setPasso] = useState(1);

  const [novoEspaco, setNovoEspaco] = useState({
    fotos: [
      'https://chaledemadeira.com/wp-content/uploads/2020/08/chal%C3%A9-por-dentro-2-1024x732.jpg',
    ],
    tipo: '',
    nome: '',
    descricao: '',
    palavrasChave: [],
    funcionamento: '',
    capacidade: 0,
  });

  const apagarFoto = (foto) => {
    console.log(foto);
    setNovoEspaco((state) => ({
      ...state,
      fotos: state.fotos.filter((f, idx) => idx !== foto),
    }));
  };
  const adicionarFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
      base64: true,
    });
    if (!result.cancelled) {
      setNovoEspaco((state) => ({
        ...state,
        fotos: [...state.fotos, 'data:image/png;base64,' + result.base64],
      }));
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Desculpe, mas é necessário ter permissão para acessar as fotos!',
          );
        }
      }
    })();
  }, []);

  const renderizarPasso = () => {
    switch (passo) {
      case 1:
        return (
          <>
            <View style={estilos.conteudo}>
              <ScrollView>
                <CampoFoto
                  rotulo="Adicione fotos do espaço abaixo"
                  fotos={novoEspaco.fotos}
                  limite={7}
                  adicionarFoto={adicionarFoto}
                  apagarFoto={(foto) => apagarFoto(foto)}
                />

                <CampoTexto
                  placeholder={'Chale, Academia, Área de churrasco...'}
                  value={novoEspaco.tipo}
                  rotulo="Tipo do espaço"
                  onChangeText={(valor) => mudaValor('tipo', valor)}
                />

                <CampoTexto
                  placeholder={'Adicione um nome simples...'}
                  value={novoEspaco.nome}
                  rotulo="Nome do espaço"
                  onChangeText={(valor) => mudaValor('nome', valor)}
                />

                <CampoTexto
                  placeholder={
                    'Digite uma descrição que deixe claro o que o espaço oferece...'
                  }
                  value={novoEspaco.descricao}
                  rotulo="Descrição"
                  style={{ height: 96, textAlignVertical: 'top', padding: 12 }}
                  onChangeText={(valor) => mudaValor('descricao', valor)}
                />

                <CampoTexto
                  placeholder={'Cozinha, Banheiro, 2 Quartos...'}
                  value={novoEspaco.palavrasChave.join(',')}
                  rotulo="Digite palavras-chave separadas por vírgula"
                  onChangeText={(valor) =>
                    mudaValor('palavrasChave', valor.split(','))
                  }
                />

                <CampoTexto
                  placeholder={'24 horas por dia, 7 dias por semana'}
                  value={novoEspaco.funcionamento}
                  rotulo="Informe uma descrição sobre o funcionamento"
                  onChangeText={(valor) => mudaValor('funcionamento', valor)}
                />

                <CampoTexto
                  placeholder={'30'}
                  value={novoEspaco.capacidade}
                  rotulo="Informe a capacidade de pessoas no espaço"
                  onChangeText={(valor) => mudaValor('capacidade', valor)}
                />

                <BotaoAcao
                  primario
                  titulo="Adicionar"
                  onPress={() => setPasso(2)}
                />
                <BotaoAcao
                  titulo="Cancelar"
                  style={{ marginBottom: 35 }}
                  onPress={() => navigation.goBack()}
                />
              </ScrollView>
            </View>
          </>
        );
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        {renderizarPasso()}
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

  tituloContainer: {
    width: screenWidth,
    height: screenHeight * 0.3,
    marginTop: StatusBar.currentHeight + 24,
    flex: 1,
    padding: 35,
  },

  titulo: {
    fontSize: 24,
    fontFamily: 'Ubuntu_400Regular',
    textAlign: 'left',
    maxWidth: 270,
    color: '#7a6428',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 14,
    fontFamily: 'Ubuntu_300Light',
    textAlign: 'left',
    maxWidth: 300,
    color: '#7a6428',
  },

  conteudo: {
    width: screenWidth,
    height: screenHeight * 0.88,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,

    paddingTop: 42,
    paddingRight: 35,
    paddingBottom: 42,
    paddingLeft: 35,

    flex: 1,
    justifyContent: 'center',
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
});

export default EditarEspacoAdm;
