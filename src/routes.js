import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Main from './pages/Main';
import Repositorio from './pages/Repositorio';


export default function Caminhos(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Main}/>
                <Route exact path='/repositorio/:repositorio' Component={Repositorio}/>

            </Routes>
        </BrowserRouter>
    //O /:repositório é um parametro que ele pode receber, assim ele diferencia parametro da pasta
    )
}