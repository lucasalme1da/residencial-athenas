import React, { useEffect } from 'react';
import Router from './src/routes';

// Importando BackHandler para conferir se o usuario deseja realmente fechar o app
import { Alert, BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';

import firebase from 'firebase';
import { firebaseConfig } from './src/config/firebase';

// Importando provider do React Native Paper para correto funcionamento do Bottom Navigator
import { Provider as PaperProvider } from 'react-native-paper';

// Importando pacotes do debugger e do pacote da caixa de erros devido ao erro de timers
import { composeWithDevTools } from 'redux-devtools-extension';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

// Importando pacotes relacionados ao Redux e criando armazém
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './src/reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

import moment from 'moment';
import 'moment/locale/pt-br';

const App = ({ navigation }) => {
  moment.locale('pt-br');

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </Provider>
  );
};
export default App;
