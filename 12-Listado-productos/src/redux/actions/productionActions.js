import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_ERROR,
    DESCARGAR_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //Insertar en la API
            await clienteAxios.post('/productos', producto);
            dispatch(agregarProductoExito(producto));
            //Alert
            Swal.fire(
                'Correcto',
                'El producto se agrego con exito',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }

    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
});

// Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//Si da error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGAR_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGAR_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito(id));

            Swal.fire(
                'Eliminado!',
                'El producto se elimino exitosamente.',
                'success'
            )

        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoAction(producto));
    }
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
export function editarProductoAction (producto) {
    return async(dispatch) => {
        dispatch(editarProducto());

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));

        } catch (error) {
            console.log(error);
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})