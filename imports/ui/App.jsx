import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import { RestorePass } from './RestorePass';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { NewUser } from './NewUser';
import { UserArea } from '/ToDoList/imports/ui/UserArea';

export const App = () => {
  const user = useTracker(() => Accounts.user());

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/cadastro' element={<NewUser />} />
        <Route path='/recuperasenha' element={<RestorePass />} />
        <Route path='/tarefas' element={<TaskForm />} />
      </Routes>

      <div className="main">
        {user ? (
          <Fragment>
            <TaskForm />
          </Fragment>
        ) : (
          <LoginForm />
        )}
        <Link to='/recuperasenha' id="link-cadastro-login" title="Cadastre-se">Esqueci minha senha.</Link><br />
        <Link to={'/cadastro'} id="link-cadastro-login" title="Cadastre-se">Não tem cadastro? Cadastre-se!</Link><br />
      </div>
    </Router>
  );
};

export default App;