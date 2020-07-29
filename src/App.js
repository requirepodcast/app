/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import ListenScreen from './screens/ListenScreen';
import ListScreen from './screens/ListScreen';
import {theme} from './utils/theme';
import {useMount} from './utils/useMount';
import {getEpisodes} from './store/actions/episodes';

const Tab = createBottomTabNavigator();

const App = () => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(getEpisodes());
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.red,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: theme.bg.medium,
          borderTopColor: theme.bg.dark,
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
  );
};

export default App;
