import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const MyButton = styled.div`
  margin-top: 1rem;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 2px;
  background-color: seagreen;
  cursor: pointer;

  & span {
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
  }

  &:hover {
    background-color: white;
    border-color: seagreen;
    & span {
      color: black;
    }
  }
`
