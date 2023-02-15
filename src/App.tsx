import React, {Component} from 'react';
import LoginPage from './pages/LoginPage';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    primary: '#1677ff',
  },
};
export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <LoginPage />
      </PaperProvider>
    );
  }
}

export default App;
