import 'react-native-gesture-handler';

import React, { useRef } from 'react';
import { StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import analytics from '@react-native-firebase/analytics';

import ListenScreen from './screens/ListenScreen';
import { theme } from './utils/theme';
import { useMount } from './utils/useMount';
import EpisodesScreen from './screens/EpisodesScreen';
import TabBar from './components/TabBar/TabBar';
import PlayerModal from './components/PlayerModal/PlayerModal';

import NotificationSubscribtionService from './services/NotificationSubscribtionService';
import Providers from './components/Providers/Providers';

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
      tabBar={props => <TabBar {...props} />}
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
    NotificationSubscribtionService.isSubscribed().then(status => {
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
      <Providers>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRoute = navigationRef.current.getCurrentRoute();

            if (previousRouteName !== currentRoute.name) {
              await analytics().logScreenView({
                screen_name: currentRoute.params?.episode
                  ? currentRoute.params.episode.title
                  : currentRoute.name,
                screen_class: currentRoute.name,
              });
            }

            routeNameRef.current = currentRoute.name;
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
      </Providers>
    </>
  );
}

export default App;
