import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from '../cryptomonedas.png';
import Formulario from '../components/Formulario';
import Cotizacion from '../components/Cotizacion';
import Spinner from '../components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width:992px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem;
`;

const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;

    &::after {
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66A2FE;
        display:block;
    }
`;

const App = () => {

    const [moneda, guardarMoneda] = useState('');
    const [criptomoneda, guardarCriptomoneda] = useState('');
    const [resultado, guardarResultado] = useState({});
    const [cargando, guardarCargando] = useState(false);

    useEffect(() => {

        const cotizarMoneda = async () => {
            if(moneda === '' || criptomoneda === '') return;
    
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
            const resultado = await axios.get(url);

            // mostrar spinner
            guardarCargando(true);
            setTimeout(() => {
                guardarCargando(false);
                guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            }, 8000);
        }

        cotizarMoneda();



    },[moneda, criptomoneda]);

    return ( 
        <Contenedor>
            <div>
                <Imagen
                    src={imagen}
                    alt="imagen crypto"
                 />
            </div>
            <div>
                <Heading>Cotizador de Criptomonedas</Heading>
                <Formulario 
                    guardarMoneda={guardarMoneda}
                    guardarCriptomoneda={guardarCriptomoneda}
                />
                { cargando ? <Spinner /> : 
                    <Cotizacion 
                        resultado={resultado}
                    />                                
                }
            </div>
            <div></div>
        </Contenedor>
     );
}
 
export default App;