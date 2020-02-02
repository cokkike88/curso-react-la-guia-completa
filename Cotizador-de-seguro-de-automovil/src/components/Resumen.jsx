import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { primeraMayuscula } from '../helper';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    let {marca, year, plan} = datos;

    if(marca === '' || year === '' || plan === '') return null;

    return ( 
        <ContenedorResumen>
            <h2>Resumen de cotizacion</h2>
            <ul>
                <li>Marca: { primeraMayuscula(marca)}</li>
                <li>Plan: { primeraMayuscula(plan)}</li>
                <li>Año del auto: {year}</li>
            </ul>            
        </ContenedorResumen>
     );
}
 
export default Resumen;