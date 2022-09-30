import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { ListItemButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditTarefa }) => {

  return (
    <div>
      {
        task.pessoal === 'sim' && (
          task.userLog === Accounts.user().username && (
            <div>
              <ListItemButton>
                <input
                  type="checkbox"
                  checked={!!task.isChecked}
                  onClick={() => { onCheckboxClick(task) }}
                  readOnly
                /></ListItemButton >
              <ListItemButton className='title-task'>{task.titulo}</ListItemButton>
              <ListItemButton className='text-task'>{task.text}</ListItemButton >
              <ListItemButton className='user-task'>Usuário: {task.userLog}</ListItemButton >
              <ListItemButton><IconButton aria-label="delete" onClick={() => onDeleteClick(task, task.userLog)}><DeleteIcon /></IconButton></ListItemButton>
              <ListItemButton><Button variant="text" aria-label="editar" className="button-task-edit" onClick={() => { onEditTarefa(task, task.userLog) }}><EditIcon /></Button></ListItemButton>
              <br />
            </div>
          )
        )}
      {task.pessoal === 'nao' && (
        <div>
          <ListItemButton>
            <input
              type="checkbox"
              checked={!!task.isChecked}
              onClick={() => { onCheckboxClick(task) }}
              readOnly
            /></ListItemButton >
          <ListItemButton className='title-task'>{task.titulo}</ListItemButton>
          <ListItemButton className='text-task'>{task.text}</ListItemButton >
          <ListItemButton className='user-task'>Usuário: {task.userLog}</ListItemButton >
          <ListItemButton><IconButton aria-label="delete" onClick={() => onDeleteClick(task, task.userLog)}><DeleteIcon /></IconButton></ListItemButton>
          <ListItemButton><Button variant="text" aria-label="editar" className="button-task-edit" onClick={() => { onEditTarefa(task, task.userLog) }}><EditIcon /></Button></ListItemButton>
          <br />
        </div>
      )
      }
    </div>
  );
};