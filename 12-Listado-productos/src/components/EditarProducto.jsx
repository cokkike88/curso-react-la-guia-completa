import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../redux/actions/productionActions';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    // Producto a editar
    const productoEditar = useSelector(state => state.productos.productoEditar);

    useEffect(() => {
        guardarProducto(productoEditar);
    }, [productoEditar])


    const {nombre, precio} = producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));

        history.push('/');
    }

    // Lee los datos de formulario
    const onChageFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-wight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
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
                                    onChange={onChageFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Precio Producto
                                </label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChageFormulario}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;