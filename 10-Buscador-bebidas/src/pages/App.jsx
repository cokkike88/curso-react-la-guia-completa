import React, { Fragment } from 'react';
import Header from '../components/Header';
import Formulario from '../components/Formulario';
import ListaRecetas from '../components/ListaRecetas';

import CagegoriasProvider from '../context/CategoriaContext';
import RecetasProvider from '../context/RecetasContext';
import ModalProvider from '../context/ModalContext';

const App = () => {
    return ( 
        <CagegoriasProvider>
            <RecetasProvider>
                <ModalProvider>
                    <Header />
                    <div className="container mt-5">
                        <div className="row">
                            <Formulario />
                        </div>
                        <ListaRecetas />
                    </div>
                </ModalProvider>
            </RecetasProvider>
        </CagegoriasProvider>
     );
}
 
export default App;