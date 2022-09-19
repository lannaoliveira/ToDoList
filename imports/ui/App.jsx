import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { NewUser } from './NewUser';
import { RestorePass } from './RestorePass';

export const App = () => {

  const user = useTracker(() => Accounts.user());

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/cadastro' element={<NewUser />} />
        <Route path='/recuperasenha' element={<RestorePass />} />
      </Routes>

      <header id='cabecalho'>
        <br/><Link to={'/cadastro'} id="link-cadastro-login" title="Cadastre-se">Não tem cadastro? Cadastre-se!</Link><br />
      </header>
      
    </Router>
  );
};