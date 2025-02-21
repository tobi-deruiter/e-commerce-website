import Button from 'react-bootstrap/Button';
import styled from "styled-components";

const ThemeButton = styled(Button)`
    background-color: ${props => props.theme.tertiary};
    border-color: ${props => props.theme.tertiary};
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 0.75rem;
    color: ${props => props.theme.white};
    &:hover {
        background-color: ${props => props.theme.tertiary_dark};
        border-color: ${props => props.theme.tertiary_dark};
    }
`

export default ThemeButton;
