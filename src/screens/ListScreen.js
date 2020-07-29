import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EpisodesList from '../components/EpisodesList/EpisodesList';
import {theme} from '../utils/theme';

const Stack = createStackNavigator();

function ListScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.bg.medium},
        headerTintColor: theme.fg,
      }}>
      <Stack.Screen name="Odcinki" component={EpisodesList} />
    </Stack.Navigator>
  );
}

export default ListScreen;
