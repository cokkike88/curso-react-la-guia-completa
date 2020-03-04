import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const { proyecto } = useContext(proyectoContext);
    if(!proyecto) return null;
    const [proyectoActual] = proyecto;

    const { agregarTarea, 
            validarTarea, 
            errorTarea,
            obtenerTareas,
            tareaSeleccionada,
            actualizarTarea 
    } = useContext(TareaContext);

    useEffect(() => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada);
        }
        else{
            guardarTarea({
                nombre: ''
            })
        }
    },[tareaSeleccionada])

    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    const { nombre } = tarea;

    const handleOnChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar 
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Es nuevo o modificar
        if(tareaSeleccionada === null){        
            tarea.proyecto = proyectoActual._id;            
            agregarTarea(tarea);
        }
        else{
            actualizarTarea(tarea);
        }

        obtenerTareas(proyectoActual._id);

        guardarTarea({
            nombre: ''
        });


    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block" 
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}

                    />
                </div>
            </form>
            {errorTarea? <p className="mensaje error">El nombre de la tarea es obligatorio.</p>  : null}
        </div>
     );
}
 
export default FormTarea;