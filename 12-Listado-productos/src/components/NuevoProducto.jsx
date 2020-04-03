import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { crearNuevoProductoAction } from '../redux/actions/productionActions';
import { mostrarAlerta, ocultarAlerta } from '../redux/actions/alertActions';

const NuevoProducto = ({history}) => {

    //State del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    //Utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    //Manda a llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    const submitNuevoProducto = e => {
        e.preventDefault();

        console.log('nombre', nombre, 'precio', precio);

        //Validar formulario
        if(nombre.trim() === '' && precio <= 0){

            console.log('ERROR');

            const respuesta = {
                msg: 'Ambos campos son obligatorias',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch(mostrarAlerta(respuesta));

            return;
        }

        //Si no hay errores
        dispatch(ocultarAlerta());
        //Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        history.push('/');
    }

    return (
         <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-wight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>
                                    Nombre Producto
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Precio Producto
                                </label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"

                            >
                                Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando...</p>: null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>: null}
                    </div>
                </div>
            </div>
         </div>
    );
}
 
export default NuevoProducto;