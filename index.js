/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// console.warn = () => {};
// console.error = () => {};

AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
