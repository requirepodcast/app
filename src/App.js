/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components';

import ListenScreen from './screens/ListenScreen';
import ListScreen from './screens/ListScreen';
import {theme} from './utils/theme';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: theme.red,
              inactiveTintColor: 'gray',
              style: {
                backgroundColor: theme.bg.dark,
              },
            }}>
            <Tab.Screen
              name="Słuchaj"
              component={ListenScreen}
              options={{
                tabBarIcon: ({size, color}) => (
                  <Icon name="play-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Odcinki"
              component={ListScreen}
              options={{
                tabBarIcon: ({size, color}) => (
                  <Icon name="list" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
