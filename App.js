import React from 'react';
import Router from './src/routes';

import { Provider as PaperProvider } from 'react-native-paper';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './src/reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

const App = (props) => (
  <Provider store={store}>
    <PaperProvider>
      <Router />
    </PaperProvider>
  </Provider>
);

export default App;
