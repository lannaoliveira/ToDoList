import { Button, ListItem } from '@material-ui/core';
import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick, onEdit }) => {
  return (
    <>
      <ListItem>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => { onCheckboxClick(task) }}
          readOnly
        />
        <h2>{task.titulo}: </h2>
        <ListItem><h3>{task.text}</h3></ListItem>
        <ListItem><h3>Usuário: {task.userLog}</h3></ListItem>
        <Button id="button-taks-delete" onClick={() => onDeleteClick(task)}>Apagar</Button>
        <Button id="button-taks-edit" onClick={() => onEdit(task)}>Editar</Button>
      </ListItem>
    </>
  );
};