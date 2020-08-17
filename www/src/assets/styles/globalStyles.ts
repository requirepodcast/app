import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bg.dark};
    color: ${({ theme }) => theme.fg};
    font-family: 'Fira Code', monospace;
    margin: 0;
  }
`;
