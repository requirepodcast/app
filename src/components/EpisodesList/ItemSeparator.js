import styled from 'styled-components/native';

const ItemSeparator = styled.View`
  height: 1px;
  margin: 0 10px;
  background-color: ${({theme}) => theme.bg.dark};
`;

export default ItemSeparator;
