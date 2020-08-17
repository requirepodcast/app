import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');

  body {
    background-color: ${({ theme }) => theme.bg.dark};
    color: white;
    font-family: 'Fira Code', monospace;
  }
`;
