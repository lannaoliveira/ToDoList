import React from 'react';
import { TaskForm } from './TaskForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NewUser } from './NewUser';
import { Index } from './Index';
import { VeTask } from './VeTask';
import { UserL } from './UserL';
import { PaginaInicial } from './PaginaInicial';
import { EditTask } from '/ToDoList/imports/ui/EditTask';

export const App = () => {

  return (
    <div className='main'>

      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/paginicial' element={<PaginaInicial />} />
          <Route path='/cadastro' element={<NewUser />} />
          <Route path='/tarefas' element={<TaskForm />} />
          <Route path='editatarefa/:id' element={<VeTask />} />
          <Route path='tarefas/editatarefa/:id' element={<VeTask />} >
            <Route path='editatarefafinal' element={<EditTask />} />
          </Route>
          <Route path='/usuario' element={<UserL />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;