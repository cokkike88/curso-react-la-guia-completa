import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    const { usuario, usuarioAutenticado, cerrarSesion } = useContext(AuthContext);

    useEffect(() => {
        usuarioAutenticado();
    },[])

    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>{!usuario ? null : usuario.nombre}</span></p>

            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesion
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;
