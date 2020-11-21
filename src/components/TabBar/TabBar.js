import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

import TabBarPlayer from '../TabBarPlayer/TabBarPlayer';

function TabBar(props) {
  return (
    <View>
      <TabBarPlayer />
      <BottomTabBar {...props} />
    </View>
  );
}

export default TabBar;
