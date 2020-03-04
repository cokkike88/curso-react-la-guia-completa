import React, { useContext } from 'react'
import TareaContext from '../../context/tareas/tareaContext';


const Tareas = ({tarea}) => {

    // console.log('TAREA', tarea);

    const { 
        eliminarTarea,
        obtenerTareas,
        cambiarEstadoTarea,
        guardarTareaActual 
    } = useContext(TareaContext);

    const tareaEliminar = async tarea => {  
        // console.log('tarea', tarea);
        
        await eliminarTarea(tarea._id, tarea.proyecto);
        await obtenerTareas(tarea.proyecto);
    }

    // Modifica el estado de las tareas
    const cambiarEstado = tarea => {

        if(tarea.estado){
            tarea.estado = false
        }
        else{
            tarea.estado = true;
        }

        cambiarEstadoTarea(tarea);
        obtenerTareas(tarea.proyecto);
    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ?
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    :
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tareas;