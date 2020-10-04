import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux';
import { AsyncStorage } from '@react-native-community/async-storage';

import ListenScreen from './screens/ListenScreen';
import { theme } from './utils/theme';
import { useMount } from './utils/useMount';
import { getEpisodes } from './store/actions/episodes';
import EpisodesScreen from './screens/EpisodesScreen';
import TabBar from './components/TabBar/TabBar';
import PlayerModal from './components/PlayerModal/PlayerModal';

import { store } from './store/store';

// Navigators
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function Main() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.red,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: theme.bg.medium,
          borderTopColor: theme.bg.medium,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Słuchaj"
        component={ListenScreen}
        options={{
          tabBarIcon: ({ size, color }) => <Icon name="headset" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Odcinki"
        component={EpisodesScreen}
        options={{
          tabBarIcon: ({ size, color }) => <Icon name="list" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  useMount(() => {
    store.dispatch(getEpisodes());

    AsyncStorage.getItem('SubscribedToNotifications').then((subscribed) => {
      if (!subscribed) {
        Alert.alert(
          'Powiadomienia',
          'Czy chcesz otrzymywać powiadomienia na temat nowych odcinków? Zawsze możesz to zmienić w ustawieniach.',
          [
            {
              text: 'Nie',
              style: 'cancel',
              onPress: () => {
                AsyncStorage.setItem('SubscribedToNotifications', 'false');
              },
            },
            {
              text: 'Tak',
              onPress: () => {
                AsyncStorage.setItem('SubscribedToNotifications', 'true');
              },
            },
          ],
        );
      }
    });
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator mode="modal">
              <RootStack.Screen name="Main" component={Main} options={{ headerShown: false }} />
              <RootStack.Screen
                name="PlayerModal"
                component={PlayerModal}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
}

export default App;
