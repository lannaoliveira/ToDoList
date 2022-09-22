import { Button, ListItem } from '@material-ui/core';
import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick, user }) => {
  return (
    <>
        <ListItem>
            <input
              type="checkbox"
              checked={!!task.isChecked}
              onClick={() => {onCheckboxClick(task), user.username}}
              readOnly
            />
            <span>{task.text}</span>
            <Button id="tarefa-apagar" onClick={() => onDeleteClick(task)}>&times;</Button>
        </ListItem>
    </>
  );
};