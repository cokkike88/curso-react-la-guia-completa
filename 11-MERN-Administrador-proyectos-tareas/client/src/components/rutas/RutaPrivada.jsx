import React, { useContext, useEffect, Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props}) => {
    
    const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return (
        <Route
            {...props}
            render = { props => !autenticado && !cargando ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )}
        />
    )
}

export default RutaPrivada;