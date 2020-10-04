import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { theme } from '../utils/theme';
import { version } from '../../package.json';
import NotificationSubscribtionService from '../services/NotificationSubscribtionService';
import { useMount } from '../utils/useMount';

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

  useMount(() => {
    NotificationSubscribtionService.isSubscribed().then((status) => {
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
        <View style={styles.item}>
          {subscribed !== undefined && (
            <>
              <Text>Powiadomienia o nowych odcinkach</Text>
              <Switch
                value={subscribed}
                onValueChange={toggleSubscribed}
                thumbColor={theme.red}
                trackColor={{ true: '#3f3f4f', false: '#3f3f4f' }}
              />
            </>
          )}
        </View>
        <View style={styles.separator} />
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
  item: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.bg.darker,
    marginHorizontal: 5,
  },
});

export default SettingsScreen;
