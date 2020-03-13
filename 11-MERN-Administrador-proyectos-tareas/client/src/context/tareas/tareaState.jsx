import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types';

const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {

        try {
            // console.log('obenerTareas', proyecto);
            const resultado = await clienteAxios.get(`/api/tarea/tareas_proyecto`, {params: { proyecto }});
            // console.log('obtenerTareas', resultado.data);

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }


    }

    // Agregar tarea
    const agregarTarea = async tarea => {

        try {
            console.log('tarea', tarea);
            const resultado = await clienteAxios.post('/api/tarea', tarea);
            console.log(resultado.data);

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }


    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            console.log('eliminar id, proyecto', id, proyecto);
            await clienteAxios.delete(`/api/tarea/${id}`, { params: { proyecto }});
    
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Modifica una tarea
    const actualizarTarea = async tarea => {

        try {
            
            const resultado = await clienteAxios.put(`/api/tarea/${tarea._id}`, tarea);
            console.log(resultado);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            
        }


    }

    return ( 
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                // cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
     );
}
 
export default TareaState;
