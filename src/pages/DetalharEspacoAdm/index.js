import React, { useState, useRef } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';

import { Modal, BotaoAcao } from '../../components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const ReservaCriada = require('../../../assets/reserva_criada.png');
const Fundo = require('../../../assets/logotipo.png');

const DetalharEspacoAdm = ({ props }) => {
  const [espaco, setEspaco] = useState({
    id: 'sadfdioafa',
    tipo: 'Chalé Completo',
    nome: 'Chalé Olympus',
    capacidade: 30,
    maisSobre:
      'Um chalé aconchegante, com tudo o que você precisa para ter uma experiência diferente aqui no Athenas. Ideal para festas sociais, aniversários, reuniões de empresa ou outros eventos relacionados.',
    recursos:
      'Cozinha ampla, 2 Wcs, sala de estar com projetor, ar condicionado e aquecedor.',
    descricaoFuncionamento: '24 horas por dia, 7 dias por semana',
    imagens: [
      'https://media-cdn.tripadvisor.com/media/photo-s/06/ff/da/e8/chales-pedra-do-bau.jpg',
      'https://media-cdn.tripadvisor.com/media/photo-s/02/24/d4/9b/grunwald-chales.jpg',
      'https://a0.muscache.com/im/pictures/6173899e-8b40-448d-8222-1925a54c9960.jpg?im_w=720',
    ],
  });

  const [escolherData, setEscolherData] = useState(false);

  const [dataReserva, setDataReserva] = useState(null);

  const [passoModal, setPassoModal] = useState(1);

  const modalRef = useRef(null);

  const abrirModal = () => {
    modalRef.current?.open();
  };

  const fecharModal = () => {
    modalRef.current?.close();
  };

  const [paginaAtual, setPaginaAtual] = useState(0);

  const pagination = () => {
    return (
      <Pagination
        dotsLength={espaco.imagens.length}
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

  const renderizarModal = () => {
    switch (passoModal) {
      case 1:
        return (
          <View style={estilos.modalReservarContainer}>
            <Text style={estilos.modalTitulo}>Você está reservando</Text>
            <Text style={estilos.modalNomeEspaco}>{espaco.nome}</Text>
            <View style={{ width: screenWidth - 70 }}>
              <Text style={estilos.modalBotaoDataNome}>
                escolha a data abaixo
              </Text>
              <BotaoAcao
                titulo={
                  moment(dataReserva).isValid()
                    ? moment(dataReserva).format('DD/MM/YYYY')
                    : 'Escolher data'
                }
                onPress={() => setEscolherData(true)}
              />
              <DateTimePickerModal
                isVisible={escolherData}
                mode="date"
                onConfirm={(data) => {
                  setDataReserva(data);
                  setEscolherData(false);
                }}
                onCancel={() => setEscolherData(false)}
                minimumDate={new Date()}
              />
            </View>
            <Text style={estilos.modalAlerta}>
              Você só poderá cancelar sua reserva até 24 horas antes do dia da
              reserva!
            </Text>
            <View style={estilos.modalBotaoContainer}>
              <BotaoAcao
                titulo="Confirmar reserva"
                onPress={() => {
                  setPassoModal(2);
                }}
                primario
              />
              <BotaoAcao titulo="Cancelar" onPress={fecharModal} />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={estilos.modalReservaCriada}>
            <Image source={ReservaCriada} style={estilos.modalImagem} />
            <Text style={estilos.reservaTitulo}>
              Reserva concluída com sucesso!
            </Text>
            <Text style={estilos.modalAlerta}>
              Você pode ver todas as suas reservas na aba de “Reservas” do menu
              principal.
            </Text>
            <View style={estilos.modalBotaoContainer}>
              <BotaoAcao titulo="Fechar" onPress={fecharModal} />
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }} behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        <View style={estilos.conteudo}>
          <ScrollView style={estilos.espacosContainer}>
            <View style={estilos.carousel}>
              <Carousel
                data={espaco.imagens}
                renderItem={({ item: imagem }) => {
                  return (
                    <Image source={{ uri: imagem }} style={estilos.imagem} />
                  );
                }}
                onSnapToItem={(index) => setPaginaAtual(index)}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
              />
              {pagination()}
            </View>
            <View style={estilos.secaoContainer}>
              <View style={estilos.tituloContainer}>
                <View style={estilos.tagContainer}>
                  <Text style={estilos.tag}>{espaco.tipo}</Text>
                </View>
                <Text style={estilos.titulo}>{espaco.nome}</Text>
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
            <Text style={estilos.listaTitulo}> • Mais sobre o local</Text>
            <Text style={estilos.listaDescricao}>{espaco.maisSobre}</Text>
            <Text style={estilos.listaTitulo}> • Recursos oferecidos</Text>
            <Text style={estilos.listaDescricao}>{espaco.recursos}</Text>
            <Text style={estilos.listaTitulo}>
              {' '}
              • Descricao sobre funcionamento
            </Text>
            <Text style={estilos.listaDescricao}>
              {espaco.descricaoFuncionamento}
            </Text>

            <BotaoAcao titulo="Editar" onPress={abrirModal} primario />
            <BotaoAcao titulo="Remover" onPress={() => {}} />
          </ScrollView>
          <Modal modalRef={modalRef} altura={450}>
            {renderizarModal()}
          </Modal>
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
    paddingBottom: 82,

    justifyContent: 'center',
    alignItems: 'center',
  },

  logotipoContainer: {
    width: screenWidth,
    height: 100,
    marginTop: StatusBar.currentHeight + 24,
    height: 200,
    flex: 1,
    alignItems: 'center',
  },

  espacosContainer: {
    width: screenWidth,
    paddingHorizontal: 35,
  },

  titulo: {
    fontSize: 18,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: 270,
    color: '#7a6428',
  },

  descricao: {
    fontSize: 16,
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    maxWidth: 270,
    color: '#7a6428',
    marginBottom: 16,
  },

  carousel: {
    height: 280,
    width: screenWidth - 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paginacao: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: '#B09858',
  },

  imagem: {
    width: screenWidth - 70,
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },

  tituloContainer: {
    width: (screenWidth - 70) * 0.7,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 24,
    fontFamily: 'Ubuntu_500Medium',
    color: '#7A6428',
    marginBottom: 4,
  },

  capacidadeContainer: {
    width: (screenWidth - 70) * 0.3,
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
    marginVertical: 6,
  },

  tag: {
    fontFamily: 'Ubuntu_300Light',
    color: '#7A6428',
  },

  secaoContainer: {
    width: screenWidth - 70,
    flexDirection: 'row',
  },

  listaTitulo: {
    fontFamily: 'Ubuntu_700Bold',
    marginVertical: 16,
    color: '#7a6428',
  },

  listaDescricao: {
    fontFamily: 'Ubuntu_300Light',
    color: '#7a6428',
  },

  modalReservarContainer: {
    width: screenWidth - 70,
    alignItems: 'center',
  },

  modalTitulo: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#7A6428',
    fontSize: 16,
  },

  modalNomeEspaco: {
    fontFamily: 'Ubuntu_700Bold',
    color: '#7A6428',
    fontSize: 24,
    marginVertical: 24,
  },

  modalBotaoDataNome: {
    fontFamily: 'Ubuntu_300Light',
    color: '#7A6428',
    margin: 0,
  },

  modalAlerta: {
    fontFamily: 'Ubuntu_300Light',
    color: '#7A6428',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 32,
  },

  modalBotaoContainer: {
    width: screenWidth - 70,
  },

  reservaTitulo: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#7A6428',
    fontSize: 16,
    textAlign: 'center',
  },

  modalImagem: {
    width: 208,
    height: 148,
    alignSelf: 'center',
    marginVertical: 32,
  },
});

export default DetalharEspacoAdm;
