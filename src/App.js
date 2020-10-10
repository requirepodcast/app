import 'react-native-gesture-handler';

import React, { useRef } from 'react';
import { StatusBar, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux';
import analytics from '@react-native-firebase/analytics';

import ListenScreen from './screens/ListenScreen';
import { theme } from './utils/theme';
import { useMount } from './utils/useMount';
import { getEpisodes } from './store/actions/episodes';
import EpisodesScreen from './screens/EpisodesScreen';
import TabBar from './components/TabBar/TabBar';
import PlayerModal from './components/PlayerModal/PlayerModal';

import { store } from './store/store';
import NotificationSubscribtionService from './services/NotificationSubscribtionService';

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
  const navigationRef = useRef();
  const routeNameRef = useRef();

  useMount(() => {
    store.dispatch(getEpisodes());

    NotificationSubscribtionService.isSubscribed().then((status) => {
      if (status === NotificationSubscribtionService.status.NOT_SET) {
        Alert.alert(
          'Powiadomienia',
          'Czy chcesz otrzymywać powiadomienia na temat nowych odcinków? Zawsze możesz to zmienić w ustawieniach.',
          [
            {
              text: 'Nie',
              style: 'cancel',
              onPress: NotificationSubscribtionService.unsubscribe,
            },
            {
              text: 'Tak',
              onPress: NotificationSubscribtionService.unsubscribe,
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
          <NavigationContainer
            ref={navigationRef}
            onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef.current.getCurrentRoute().name;

              if (previousRouteName !== currentRouteName) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
              }

              routeNameRef.current = currentRouteName;
            }}
          >
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
