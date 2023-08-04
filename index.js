import { AppRegistry } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import App from './App';
import { name as appName } from './app.json';
import { getDateTime } from './src/common/constants';

getDateTime();

AppRegistry.registerComponent(appName, () => App);
