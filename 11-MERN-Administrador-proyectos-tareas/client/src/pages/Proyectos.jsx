import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/autenticacion/authContext';
import Sidebar from '../components/layout/Sidebar';
import Barra from '../components/layout/Barra';
import FormTarea from '../components/tareas/FormTarea';
import ListadoTareas from '../components/tareas/ListadoTareas';

const Proyectos = () => {

    const { usuarioAutenticado } = useContext(AuthContext);

    useEffect(() => {
        // usuarioAutenticado();
    },[])

    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedoor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;