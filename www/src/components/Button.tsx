import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.red};
  font-family: inherit;
  font-size: 1.15em;
  padding: 10px 20px;
  color: ${({ theme }) => theme.fg};
  border: none;
  outline: none;
  border-radius: 5px;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
