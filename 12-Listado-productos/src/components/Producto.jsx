import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../redux/actions/productionActions';

const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: 'Un producto que se elimina, no se puede eliminar',
            icon: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Canclear'
        }).then(result => {
            if(result.value){

                // pasarlo al action
                dispatch(borrarProductoAction(id));
                
            }
        })

    }

    const {nombre, precio, id} = producto;

    // Funcion que redirigue de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`);
    }


    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio} </span></td>
            <td>
                <button 
                    type="button"
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;