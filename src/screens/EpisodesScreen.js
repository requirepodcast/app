import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import EpisodesList from '../components/EpisodesList/EpisodesList';
import {theme} from '../utils/theme';
import EpisodeDetails from '../components/EpisodeDetails/EpisodeDetails';

const Stack = createStackNavigator();

function EpisodesScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.fg,
        headerStyle: {
          backgroundColor: theme.bg.medium,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
      }}
      initialRouteName="Odcinki">
      <Stack.Screen name="Odcinki" component={EpisodesList} />
      <Stack.Screen
        name="Details"
        component={EpisodeDetails}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
}

export default EpisodesScreen;
