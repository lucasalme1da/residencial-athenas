import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  BackHandler,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {
  selecionarEspaco,
  setEspacoAtual,
} from '../../actions/espacoAtualActions';

import { atualizarEspaco } from '../../actions/espacosActions';

import { CampoFoto, CampoTexto, BotaoAcao } from '../../components';
import { tipos, validar } from '../../utils/validacao';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Fundo = require('../../../assets/logotipo.png');

const EditarEspacoAdm = ({ navigation }) => {
  const [carregando, setCarregando] = useState(false);

  const dispatch = useDispatch();

  const espacoAtual = useSelector((state) => state.espacoAtual);
  const backupEspaco = { ...espacoAtual };

  const mudaValor = (campo, valor) => {
    dispatch(setEspacoAtual(campo, valor));
  };

  const apagarFoto = (foto) => {
    dispatch(
      setEspacoAtual(
        'fotos',
        espacoAtual.fotos.filter((f, idx) => idx !== foto),
      ),
    );
  };

  const adicionarFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [406, 271],
      quality: 0.1,
      base64: true,
    });
    if (!result.cancelled) {
      dispatch(
        setEspacoAtual('fotos', [
          ...espacoAtual.fotos,
          'data:image/png;base64,' + result.base64,
        ]),
      )
        .then((r) => console.log(r))
        .catch((err) => console.log(err));
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

  const edicaoBemSucedida = () => {
    dispatch(selecionarEspaco(espacoAtual));
    Alert.alert(
      'Espaço editado',
      'O espaço foi editado com sucesso!',
      [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false },
    );
    setCarregando(false);
  };

  const edicaoMalSucedida = (err) => {
    Alert.alert(
      'Erro na edição',
      'Ocorreu um erro ao editar o espaço. Tente novamente.',
    );
    setCarregando(false);
  };

  const salvarEdicao = () => {
    setCarregando(true);

    const validacao = validar(espacoAtual, tipos.ESPACO);

    if (!validacao.valido) {
      setCarregando(false);
      return Alert.alert('Erro! Confira as informações', validacao.mensagem);
    }

    dispatch(atualizarEspaco(espacoAtual))
      .then(edicaoBemSucedida)
      .catch((err) => edicaoMalSucedida(err));
  };

  const cancelarEdicao = () => {
    Alert.alert(
      'Cancelar edição',
      'Tem certeza que deseja cancelar a edição deste espaço?',
      [
        {
          text: 'Continuar editando',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => dispatch(selecionarEspaco(backupEspaco)),
        },
      ],
    );
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      cancelarEdicao,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />

        <View style={estilos.conteudo}>
          <ScrollView>
            <CampoFoto
              rotulo="Adicione fotos do espaço abaixo"
              fotos={espacoAtual.fotos}
              limite={7}
              adicionarFoto={adicionarFoto}
              apagarFoto={(foto) => apagarFoto(foto)}
            />

            <CampoTexto
              placeholder={'Chale, Academia, Área de churrasco...'}
              value={espacoAtual.tipo}
              maxLength={20}
              rotulo="Tipo do espaço"
              onChangeText={(valor) => mudaValor('tipo', valor)}
            />

            <CampoTexto
              placeholder={'Adicione um nome simples...'}
              value={espacoAtual.nome}
              rotulo="Nome do espaço"
              maxLength={30}
              onChangeText={(valor) => mudaValor('nome', valor)}
            />

            <CampoTexto
              placeholder={
                'Digite uma descrição que deixe claro o que o espaço oferece...'
              }
              value={espacoAtual.descricao}
              rotulo="Descrição"
              style={{ height: 126, textAlignVertical: 'top', padding: 12 }}
              maxLength={220}
              onChangeText={(valor) => mudaValor('descricao', valor)}
            />

            <CampoTexto
              placeholder={
                'Resuma brevemente quais são os recursos do espaço...'
              }
              value={espacoAtual.recursos}
              rotulo="Recursos do espaço"
              maxLength={68}
              onChangeText={(valor) => mudaValor('recursos', valor)}
            />

            <CampoTexto
              placeholder={'Cozinha, Banheiro, 2 Quartos...'}
              value={espacoAtual.palavrasChave.join(',')}
              rotulo="Digite palavras-chave separadas por vírgula"
              maxLength={40}
              onChangeText={(valor) =>
                mudaValor('palavrasChave', valor.split(','))
              }
            />

            <CampoTexto
              placeholder={'24 horas por dia, 7 dias por semana'}
              value={espacoAtual.funcionamento}
              maxLength={40}
              rotulo="Informe uma descrição sobre o funcionamento"
              onChangeText={(valor) => mudaValor('funcionamento', valor)}
            />

            <CampoTexto
              placeholder={'30'}
              value={espacoAtual.capacidade}
              maxLength={3}
              rotulo="Informe a capacidade de pessoas no espaço"
              onChangeText={(valor) => mudaValor('capacidade', valor)}
            />

            <BotaoAcao
              primario
              titulo="Salvar"
              onPress={salvarEdicao}
              carregando={carregando}
            />
            <BotaoAcao
              titulo="Cancelar"
              style={{ marginBottom: 35 }}
              onPress={cancelarEdicao}
            />
          </ScrollView>
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
    height: '100%',
    color: '#7a6428',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
