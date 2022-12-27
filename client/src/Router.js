import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Empresas from './components/Empresas';
import Home from './components/Home';
import Menu from './components/Menu';
import Salas from './components/Salas';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/salas' element={<Salas/>}/>
                    <Route path='/empresas' element={<Empresas/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
