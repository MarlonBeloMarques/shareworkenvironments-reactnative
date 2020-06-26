import React from 'react';
import { StatusBar } from 'react-native';
import AppContainer from './src/routes';
import { Block } from './src/elements';

export default function App() {
  console.disableYellowBox = true;

  return (
    <Block>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </Block>
  );
}
