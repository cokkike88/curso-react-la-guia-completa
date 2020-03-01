import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import ListadoImagenes from '../components/ListadoImagenes';

const App = () => {

    const [busqueda, guardarBusqueda] = useState('');
    const [imagenes, guardarImagenes] = useState([]);
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [totalPaginas, guardarTotalPaginas] = useState(1);

    useEffect(() => {
        const buscar = async() => {
            const imagenesPorPagina = 30;
            if(busqueda === '') return;
            const key = '15129439-8ad571877315b482a668cc9e1';
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            guardarImagenes(resultado.hits);

            const calcularPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
            guardarTotalPaginas(calcularPaginas);

            // Mover la pantalla hacia arriba
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior: 'smooth'});
        };

        buscar();
    }, [busqueda, paginaActual])

    const paginaAnterior = () =>{
        const nuevaPaginaActual = paginaActual -1;
        if(nuevaPaginaActual === 0) return;
        guardarPaginaActual(nuevaPaginaActual);
    }

    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaActual + 1;
        if(nuevaPaginaActual > totalPaginas) return;
        guardarPaginaActual(nuevaPaginaActual);
    }

    return ( 
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">
                    Buscador de Imagenes
                </p>                
                <Formulario 
                    guardarBusqueda={guardarBusqueda}
                />                
            </div>
            <div className="row justify-content-center">
                <ListadoImagenes
                    imagenes={imagenes}
                />
                {(paginaActual === 1) ? null :
                    <button
                        type="button"
                        className="bbtn btn-info mr-1"
                        onClick={paginaAnterior}
                    >&laquo; Anterior</button>
                }
                {(paginaActual === totalPaginas) ? null :
                    <button
                        type="button"
                        className="bbtn btn-info"
                        onClick={paginaSiguiente}
                    >Siguiente &raquo;</button>
                }
            </div>
        </div>

     );
}
 
export default App;