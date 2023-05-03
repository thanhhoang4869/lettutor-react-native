/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-url-polyfill/auto';
import 'localization/i18n';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
