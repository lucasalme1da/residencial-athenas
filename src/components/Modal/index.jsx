import React from 'react';
import { Dimensions } from 'react-native';

import { Modalize } from 'react-native-modalize';

import { Portal } from 'react-native-paper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Modal = ({ modalRef, children, altura = 300 }) => {
  return (
    <Portal>
      <Modalize
        ref={modalRef}
        snapPoint={altura}
        handleStyle={{
          width: 60,
          height: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#D8C79950',
        }}
        modalHeight={altura}
        handlePosition="inside"
        modalStyle={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          width: screenWidth,
          height: altura,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 35,
        }}>
        {children}
      </Modalize>
    </Portal>
  );
};

export default Modal;
