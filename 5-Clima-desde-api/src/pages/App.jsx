import React, { Fragment, useState, useEffect } from 'react';
import Header from '../components/Header';
import Formulario from '../components/Formulario';
import Clima from '../components/Clima';
import Error from '../components/Error';

const App = () => {

    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    });
    const {ciudad, pais} = busqueda;
    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});
    const [error, guardarError] = useState(false);

    useEffect(() => {
        const consultarApi = async() => {

            if(consultar){
                const apiKey = '89f4accdba66e231e04797667d41a69a';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${apiKey}`;
    
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                guardarResultado(resultado);
                guardarConsultar(false);
                
                if(resultado.cod === "404"){
                    guardarError(true);
                }
                else{
                    guardarError(false);
                }
            }

            
        };
        consultarApi();
        // eslint-disable-next-line
    },[consultar])

    let componente;
    if(error){
        componente = <Error mensaje="No hay resultados" />;
    }
    else{
        componente = <Clima 
                        resultado={resultado}
                    />;
    }


    return ( 
        <Fragment>
            <Header 
                titulo='Clima React App'
            />
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col m6 s12">
                            <Formulario 
                                busqueda={busqueda}
                                guardarBusqueda={guardarBusqueda}
                                guardarConsultar={guardarConsultar}
                            />
                        </div>
                        <div className="col m6 s12">
                            {componente}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default App;