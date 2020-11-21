import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EpisodesList from '../components/EpisodesList/EpisodesList';
import { theme } from '../utils/theme';
import EpisodeDetails from '../components/EpisodeDetails/EpisodeDetails';
import SettingsScreen from './SettingsScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function EpisodesScreen() {
  const { navigate } = useNavigation();

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
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => navigate('Ustawienia')}
            >
              <Icon name="settings" color="white" size={20} />
            </TouchableOpacity>
          ),
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="Odcinek"
        component={EpisodeDetails}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="Ustawienia"
        component={SettingsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
}

export default EpisodesScreen;
