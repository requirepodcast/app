import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {theme} from '../../utils/theme';
import {getEpisode} from '../../utils/getEpisode';

function PlayerModal() {
  const navigation = useNavigation();
  const {
    player: {queuePosition},
    episodes: {episodes},
  } = useSelector((state) => state);

  const episode = getEpisode(queuePosition, episodes);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={25} color={theme.fg} />
      </TouchableOpacity>
      {episode && (
        <>
          <Text style={styles.title}>{episode.title}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: theme.fg,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default PlayerModal;
