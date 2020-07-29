/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import Providers from './src/components/Providers/Providers';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => (
  <Providers>
    <App />
  </Providers>
));
