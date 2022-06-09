import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from './pages/Inicio'
import Personajes from './pages/Personajes';
import FormPersonajes from './pages/FormPersonajes';
import FormLugares from './pages/FormLugares';
import Lugares from './pages/Lugares'
import Error404 from './pages/Error404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/personajes' element={<Personajes/>} />
        <Route path='/formulario-personajes' element={<FormPersonajes/>} />
        <Route path='/formulario-lugares' element={<FormLugares/>} />
        <Route path='/lugares' element={<Lugares/>} />
        <Route path='*' element={<Error404 />}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
