import React from 'react';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { List } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export const UserArea = () => {

    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const navigate = useNavigate();

    const toggleChecked = ({ _id, isChecked }) => {
        TasksCollection.update(_id, {
            $set: {
                isChecked: !isChecked
            }
        })
    };

    const deleteTask = ({ _id }, usuario) => {
        if (usuario === Accounts.user().username) {
            TasksCollection.remove(_id);
        } else {
            alert(`Você não tem permissão para excluir essa tarefa. Apenas ${usuario} pode fazê-lo.`);
        }
    }

    const editTarefa = ({ _id }, usuario) => {
        if (usuario === Accounts.user().username) {
            navigate('\editatarefa')
        } else {
            alert(`Você não tem permissão para editar essa tarefa. Apenas ${usuario} pode fazê-lo.`);
        }
    }

    return (
        <>
            <List className="tasks">
                {tasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        onCheckboxClick={toggleChecked}
                        onDeleteClick={deleteTask}
                        onEditTarefa={editTarefa}
                    />
                ))
                }
            </List>
        </>
    )
}
