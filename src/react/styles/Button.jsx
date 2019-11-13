import styled from 'styled-components';

const Button = styled.button`
background-color: transparent;
color: #eee;
outline: none;
outline-color: none;
border: 1px solid #eee;
padding: 0.5rem;
margin: 0.5rem 0.25rem;
flex: 1;
border-radius: 10px;
transition: color 0.25s ease-in-out, background 0.25s ease-in-out;
font-family: inherit;

&:hover {
  color: #333;
  background-color: #eee;
}
`;

export default Button;
