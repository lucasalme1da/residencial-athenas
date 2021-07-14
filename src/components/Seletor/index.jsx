import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import { MaterialIcons } from '@expo/vector-icons';
import { mudaValor } from '../../utils';

const Seletor = ({ rotulo, itens, value, onValueChange }) => {
  return (
    <View style={{ width: 310 / 2 }}>
      {rotulo && <Text style={estilos.rotulo}>{rotulo}</Text>}
      <View>
        <RNPickerSelect
          onValueChange={onValueChange}
          value={value}
          items={itens.map((item) => ({
            label: item,
            value: item,
          }))}
          useNativeAndroidPickerStyle={false}
          style={{
            placeholder: {
              color: '#95835370',
              fontFamily: 'Ubuntu_400Regular',
            },
            inputAndroid: {
              color: '#7A6428',
              fontFamily: 'Ubuntu_400Regular',
            },
            inputAndroidContainer: {
              borderRadius: 8,
              paddingLeft: 16,
              maxWidth: 330 / 2,
              minWidth: 'auto',
              height: 48,
              backgroundColor: '#f9f7f3',
              borderRadius: 8,
              justifyContent: 'center',
              marginBottom: 20,
            },
          }}
          Icon={() => (
            <MaterialIcons
              name="chevron-right"
              size={20}
              color="#7A6428"
              style={{ transform: [{ rotate: '90deg' }], marginRight: 8 }}
            />
          )}
          placeholder={{ label: 'Selecione...', value: '' }}
        />
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  rotulo: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#7A6428',
    marginBottom: 8,
  },
});

export default Seletor;
