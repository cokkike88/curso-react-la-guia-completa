import React, { Fragment, useState, useEffect } from 'react';
import Header from '../components/Header';
import Formulario from '../components/Formulario';
import ListadoNoticias from '../components/ListadoNoticias';

const App = () => {

    const [categoria, guardarCategoria] = useState('');
    const [noticias, guardarNoticias] = useState([]);

    useEffect(() => {
        const consultarApi = async () => {
            const apiKey = 'c4eab99a81014ae7ab182d0783b4ecfb';
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`;
            const respuesta = await fetch(url);
            const noticias = await respuesta.json();
            guardarNoticias(noticias.articles);            
        };

        consultarApi();
    }, [categoria])


    return ( 
        <Fragment>
            <Header titulo='Buscador de noticias' />
            <div className="container white">
                <Formulario 
                    guardarCategoria={guardarCategoria}
                />
                <ListadoNoticias 
                    noticias={noticias}
                />
            </div>
        </Fragment>
        
     );
}
 
export default App;