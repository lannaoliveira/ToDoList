import React from 'react';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { List } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { EditTask } from './EditTask';

export const UserArea = () => {

    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

    const toggleChecked = ({ _id, isChecked }) => {
        TasksCollection.update(_id, {
            $set: {
                isChecked: !isChecked
            }
        })
    };

    const deleteTask = ({ _id }) => TasksCollection.remove(_id);

    const editTask = ({ _id }) => {
        <EditTask />
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
                        onEdit={editTask}
                    />
                ))
                }
            </List>
            <Button id="button-logoff" onClick={() => {
                Accounts.logout()
            }}>Sair</Button>
        </>
    )
}
