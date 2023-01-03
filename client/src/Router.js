import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import Empresas from './components/Empresas';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Salas from './components/Salas';
import Categorias from './components/Categorias';
import Temporizador from './components/Temporizadores';
import Evento from './components/Eventos';

export default class Router extends Component {
    render() {
        function GetRecarga() {
            const { para } = useOutletContext()
            return <Login metodo={para} />
        }

        function GetOut() {
            const { deslog } = useOutletContext()
            return <Home log={deslog} />
        }
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Menu />}>
                        <Route path='' element={<GetOut />} />
                        <Route path='salas' element={<Salas />} />
                        <Route path='empresas' element={<Empresas />} />
                        <Route path='categorias' element={<Categorias />} />
                        <Route path='temporizadores' element={<Temporizador />} />
                        <Route path='eventos' element={<Evento />} />
                        <Route path='login' element={<GetRecarga />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
