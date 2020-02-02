import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from '../components/Error';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;



const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listaCripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const monedas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libre Esterlina'}
    ]

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        };
    
        consultarApi();
    
    }, [])

    const [moneda, SelectMonedas] = useMoneda('Selecciona una moneda:', '', monedas);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Seleccione una criptomoneda', '', listaCripto);

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar formulario
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarCriptomoneda(criptomoneda);
        guardarMoneda(moneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <SelectMonedas />
            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular" 
            />
        </form>
     );
}
 
export default Formulario;