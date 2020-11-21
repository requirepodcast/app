import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import Restart from 'react-native-restart';
import { theme } from '../utils/theme';
import { version } from '../../package.json';
import NotificationSubscribtionService from '../services/NotificationSubscribtionService';
import { useMount } from '../utils/useMount';
import Item from '../components/SettingsItem/SettingsItem';
import AsyncStorage from '@react-native-community/async-storage';

function SettingsScreen() {
  const [subscribed, setSubscribed] = useState(undefined);

  function toggleSubscribed() {
    if (subscribed) {
      setSubscribed(false);
      NotificationSubscribtionService.unsubscribe();
    } else {
      setSubscribed(true);
      NotificationSubscribtionService.subscribe();
    }
  }

  function resetData() {
    Alert.alert(
      'Resetowanie danych',
      'Czy na pewno chcesz usunąć stan przesłuchiwania odcinków, ustawienia itp?',
      [
        {
          text: 'Nie',
          style: 'cancel',
        },
        {
          text: 'Tak',
          onPress: () => {
            AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
            Restart.Restart();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  useMount(() => {
    NotificationSubscribtionService.isSubscribed().then(status => {
      if (status === NotificationSubscribtionService.status.SUBSCRIBED) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
    });
  });

  return (
    <View style={styles.wrapper}>
      <View>
        <Item>
          {subscribed !== undefined && (
            <>
              <Text>Powiadomienia o nowych odcinkach</Text>
              <Switch
                value={subscribed}
                onValueChange={toggleSubscribed}
                thumbColor={subscribed ? theme.red : 'gray'}
                trackColor={{ false: '#3f3f4f', true: theme.red }}
              />
            </>
          )}
        </Item>
        <Item onPress={resetData}>
          <Text>Zresetuj zapisane dane</Text>
        </Item>
      </View>
      <View>
        <Text style={styles.version}>{'\xA9'} requirepodcast_app</Text>
        <Text style={styles.version}>v{version}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.light,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    color: theme.fg,
  },
  version: {
    color: 'gray',
    textAlign: 'center',
  },
});

export default SettingsScreen;
