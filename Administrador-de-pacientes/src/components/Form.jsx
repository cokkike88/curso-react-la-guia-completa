import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Form = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };

    let submitCita = e => {
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === ''
            || fecha.trim() === '' || fecha.trim() === ''
            || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }

        actualizarError(false);

        //Asignar ID
        cita.id = uuid();
        //Crear cita
        crearCita(cita);
        // Limpiar
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }


    return ( 
        <Fragment>
            <h2>Crear cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Fecha</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>

                <button
                    typee="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Form;