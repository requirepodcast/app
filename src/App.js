import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, combineReducers} from 'redux';

import ListenScreen from './screens/ListenScreen';
import {theme} from './utils/theme';
import {useMount} from './utils/useMount';
import {getEpisodes} from './store/actions/episodes';
import EpisodesScreen from './screens/EpisodesScreen';
import TabBar from './components/TabBar/TabBar';

import {rootSaga} from './store/sagas/sagas';
import episodes from './store/reducers/episodes';
import player from './store/reducers/player';
import PlayerModal from './components/PlayerModal.js/PlayerModal';

// Redux store
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({episodes, player}),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

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
      tabBar={(props) => <TabBar {...props} />}>
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
        component={EpisodesScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  useMount(() => {
    store.dispatch(getEpisodes());
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator mode="modal">
              <RootStack.Screen
                name="Main"
                component={Main}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="PlayerModal"
                component={PlayerModal}
                options={{headerShown: false}}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
}

export default App;
