import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Linking } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';
import { theme } from '../../utils/theme';
import PlayButton from '../PlayButton/PlayButton';
import analytics from '@react-native-firebase/analytics';

import logo from '../../images/RequireLogo.png';

function EpisodeDetails({
  route: {
    params: { episode },
  },
  navigation,
}) {
  useLayoutEffect(() => {
    navigation.setOptions({ title: episode.title });

    analytics().logScreenView({});
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleView}>
        <Image style={styles.logo} source={logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.date}>{episode.publicationDate}</Text>
          <Text style={styles.title}>{episode.title}</Text>
        </View>
      </View>
      <PlayButton size="small" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MarkdownView
          onLinkPress={url => Linking.openURL(url)}
          style={{ paddingHorizontal: 10 }}
          styles={markdownStyles}
        >
          {episode.description.markdown.slice(0, 1) === '\n'
            ? episode.description.markdown.slice(1)
            : episode.description.markdown}
        </MarkdownView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.light,
    paddingVertical: 10,
    paddingBottom: 0,
  },
  titleView: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: theme.fg,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18,
  },
  logo: {
    width: 75,
    height: 75,
  },
  date: {
    color: 'gray',
    marginLeft: 10,
  },
});

const markdownStyles = {
  link: {
    color: theme.red,
    textDecorationLine: 'underline',
  },
  paragraph: {
    color: theme.fg,
    fontFamily: 'monospace',
    marginTop: 0,
  },
  heading: {
    color: theme.fg,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  listItemUnorderedContent: {
    color: theme.fg,
    fontFamily: 'monospace',
  },
  listItemBullet: {
    color: theme.fg,
  },
  inlineCode: {
    fontFamily: 'monospace',
    backgroundColor: theme.lighter,
  },
  heading2: {
    marginTop: 5,
    marginBottom: 5,
  },
  heading3: {
    marginTop: 5,
    marginBottom: 5,
  },
};

export default EpisodeDetails;
