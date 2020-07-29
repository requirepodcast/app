import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import Item from './Item';
import ItemSeparator from './ItemSeparator';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.light};
`;

function EpisodeList() {
  const episodes = useSelector((store) => store.episodes).reverse();

  return (
    <Wrapper>
      <FlatList
        data={episodes}
        keyExtractor={(episode) => episode.id}
        renderItem={({item}) => <Item episode={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Wrapper>
  );
}

export default EpisodeList;
