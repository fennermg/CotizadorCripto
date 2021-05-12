import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.p`
    background-color: #b7355c;
    padding: 1rem;
    color: #FFF;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: "Bebas neue", cursive;
` 

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>{mensaje}</MensajeError>
     );
}
 
export default Error;