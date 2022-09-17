import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import { NewUser } from './NewUser';

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const user = useTracker(() => Accounts.user());

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  return (
    <div className="main">
      {user ? (
        <Fragment>
          <TaskForm />
          <ul className="tasks">
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
              />
            ))}
          </ul>
          <button id="button-login-out" onClick={() => {}}>Sair</button>
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};