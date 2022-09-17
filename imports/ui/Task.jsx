import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <div id="lista-tarefas">
        <li>
          <input
            type="checkbox"
            checked={!!task.isChecked}
            onClick={() => onCheckboxClick(task)}
            readOnly
          />
          <span>{task.text}</span>
          <button id="tarefa-apagar" onClick={() => onDeleteClick(task)}>&times;</button>
        </li>
        </div>
  );
};