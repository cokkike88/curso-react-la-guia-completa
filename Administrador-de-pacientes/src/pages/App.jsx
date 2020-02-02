import React, { Fragment, useState, useEffect } from 'react';
import Form from '../components/Form';
import Cita from '../components/Cita';

const App = () => {

    // Citas en localstorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) {
        citasIniciales = [];
    }

    const [citas, guardarCitas] = useState(citasIniciales);

    useEffect(() => {
        if(citasIniciales){
            localStorage.setItem('citas', JSON.stringify(citas));
        }
        else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas])

    const crearCita = cita => {
        guardarCitas([
            ...citas,
            cita
        ]);
    }

    const eliminarCita = id => {
        let newCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(newCitas);
    }

    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return ( 
        <Fragment>
            <h1>Administracion de Pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Form
                            crearCita={crearCita}
                        />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                      
                </div>
            </div>
        </Fragment>
     );
}
 
export default App;