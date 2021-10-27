import React, { Component } from 'react';
import { Text, View } from 'react-native';
import StackRoute from './src/navigation/StackRoute';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Root } from 'native-base';
export class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackRoute />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

export default App;
