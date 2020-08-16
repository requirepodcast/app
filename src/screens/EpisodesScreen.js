import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EpisodesList from '../components/EpisodesList/EpisodesList';
import { theme } from '../utils/theme';
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
      initialRouteName="Odcinki"
    >
      <Stack.Screen
        name="Odcinki"
        component={EpisodesList}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Icon name="settings" color="white" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
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
