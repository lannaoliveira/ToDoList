import { Button, ListItem } from '@material-ui/core';
import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <div id="login">
      <div id="info-login">
        <ListItem>
            <input
              type="checkbox"
              checked={!!task.isChecked}
              onClick={() => onCheckboxClick(task)}
              readOnly
            />
            <span>{task.text}</span>
            <Button id="tarefa-apagar" onClick={() => onDeleteClick(task)}>&times;</Button>
        </ListItem>
      </div>
    </div>
  );
};