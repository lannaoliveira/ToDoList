import React from 'react';
import { TaskForm } from './TaskForm';
import { RestorePass } from './RestorePass';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NewUser } from './NewUser';
import { Index } from './Index';
import { EditTask } from './EditTask';
import { UserL } from './UserL';
import { EditUser } from './EditUser';

export const App = () => {

  return (
    <div className='main'>
      
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/cadastro' element={<NewUser />} />
          <Route path='/recuperasenha' element={<RestorePass />} />
          <Route path='/tarefas' element={<TaskForm />} />
          <Route path='/editatarefa' element={<EditTask />} />
          <Route path='/usuario' element={<UserL />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;