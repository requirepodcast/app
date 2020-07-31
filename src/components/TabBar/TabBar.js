import React from 'react';
import {View} from 'react-native';
import {BottomTabBar} from '@react-navigation/bottom-tabs';

import Player from '../Player/Player';

function TabBar(props) {
  return (
    <View>
      <Player />
      <BottomTabBar {...props} />
    </View>
  );
}

export default TabBar;
