import AsyncStorage from '@react-native-community/async-storage';

export default {
  saveProgress(id, progress) {
    return AsyncStorage.setItem(`progress_${id}`, progress.toString());
  },
  async getProgress(id) {
    return (await AsyncStorage.getItem(`progress_${id}`)) || 0;
  },
  cleanProgress(id) {
    return AsyncStorage.removeItem(`progress_${id}`);
  },
  lastPlaying: {
    set(id) {
      return AsyncStorage.setItem('last_playing', id);
    },
    get() {
      return AsyncStorage.getItem('last_playing');
    },
    clean() {
      return AsyncStorage.removeItem('last_playing');
    },
  },
};
