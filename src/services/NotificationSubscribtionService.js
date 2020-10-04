/* flow */
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

export default {
  async subscribe() {
    await messaging().subscribeToTopic('episodeNotifications');
    await AsyncStorage.setItem('SubscribedToNotifications', 'true');
  },
  async unsubscribe() {
    await messaging().unsubscribeFromTopic('episodeNotifications');
    await AsyncStorage.setItem('SubscribedToNotifications', 'false');
  },
  async isSubscribed(): string {
    const val = await AsyncStorage.getItem('SubscribedToNotifications');

    if (!val) {
      return this.status.NOT_SET;
    }

    if (val === 'yes') {
      return this.status.SUBSCRIBED;
    }

    if (val === 'no') {
      return this.status.NOT_SUBSCRIBED;
    }
  },
  status: {
    NOT_SET: 'notification-subscribtion-not-set',
    NOT_SUBSCRIBED: 'notification-subscribtion-not-subscribed',
    SUBSCRIBED: 'notification-subscribtion-subscribed',
  },
};
