import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TokenAuth from '../config/tokenAuth';
import Login from './auth/Login';
import NuevaCuenta from './auth/NuevaCuenta';
import Proyectos from './Proyectos';
import ProyectoState from '../context/proyectos/ProyectoState';
import TareaState from '../context/tareas/tareaState';
import AlertaState from '../context/alertas/alertaState';
import AuthState from '../context/autenticacion/authState';
import RutaPrivada from '../components/rutas/RutaPrivada';

const token = localStorage.getItem('token');
if(token){
    TokenAuth(token);
}

const App = () => {

    console.log(process.env.REACT_APP_BACKEND_URL);

    return ( 
        <ProyectoState>
            <TareaState>
                <AlertaState>
                <AuthState>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                            <RutaPrivada exact path="/proyectos" component={Proyectos} />
                        </Switch>
                    </Router>
                </AuthState>
                </AlertaState>
            </TareaState>
        </ProyectoState>
     );
}
 
export default App;