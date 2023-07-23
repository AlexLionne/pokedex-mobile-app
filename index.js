/**
 * @format
 */

import {AppRegistry, LogBox, YellowBox} from 'react-native';
import App from './App';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent("PokedexApp", () => App);
