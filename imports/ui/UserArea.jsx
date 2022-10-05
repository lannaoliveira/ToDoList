import React from 'react';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { List } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

export const UserArea = () => {

    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const navi = useNavigate();
    const label = { inputProps: { 'aria-label': 'Checkbox' } };

    const deleteTask = ({ _id }, usuario) => {
        if (usuario === Accounts.user().username) {
            TasksCollection.remove(_id);
        } else {
            alert(`Você não tem permissão para excluir essa tarefa. Apenas ${usuario} pode fazê-lo.`);
        }
    }

    const editTarefa = ({ _id }, usuario) => {
        if (usuario === Accounts.user().username) {
            navi(`editatarefa/${_id}`);
        } else {
            alert(`Você não tem permissão para editar essa tarefa. Apenas ${usuario} pode fazê-lo.`);
        }
    }

    const retTarefas = () => {
        return
    }

    return (
        <>
            <div className='checkbox'>
                <Checkbox {...label} onChange={retTarefas} />Concluídas
            </div>
            <List className="tasks">
                {tasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        onDeleteClick={deleteTask}
                        onEditTarefa={editTarefa}
                    />
                ))
                }
            </List>
        </>
    )
}
