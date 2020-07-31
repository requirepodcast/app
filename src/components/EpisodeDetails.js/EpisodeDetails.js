import React, {useLayoutEffect} from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Markdown from 'react-native-easy-markdown';
import {theme} from '../../utils/theme';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bg.light};
  padding: 10px;
  padding-bottom: 0;
`;

const TitleView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.fg};
  font-weight: bold;
  margin-left: 10px;
  font-size: 18px;
`;

const Date = styled.Text`
  color: gray;
  margin-left: 10px;
`;

const Logo = styled.Image`
  width: 75px;
  height: 75px;
`;

function EpisodeDetails({
  route: {
    params: {episode},
  },
  navigation,
}) {
  useLayoutEffect(() => {
    navigation.setOptions({title: episode.title});

    console.log(episode.description.markdown);
  });

  return (
    <Wrapper>
      <TitleView>
        <Logo
          source={{
            uri:
              'https://require.podcast.gq/static/logo-802c736d140830acbc8cb1b0ee208e4a.png',
          }}
        />
        <View style={{flex: 1}}>
          <Date>{episode.publicationDate}</Date>
          <Title>{episode.title}</Title>
        </View>
      </TitleView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Markdown
          style={{
            padding: 5,
          }}
          markdownStyles={{
            text: {
              color: theme.fg,
              fontFamily: 'monospace',
            },
            link: {
              color: theme.red,
              textDecorationLine: 'underline',
            },
            listItemBullet: {
              width: 4,
              height: 4,
              backgroundColor: 'white',
              borderRadius: 2,
              marginRight: 10,
            },
          }}>
          {episode.description.markdown.slice(0, 1) === '\n'
            ? episode.description.markdown.slice(1)
            : episode.description.markdown}
        </Markdown>
      </ScrollView>
    </Wrapper>
  );
}

export default EpisodeDetails;
