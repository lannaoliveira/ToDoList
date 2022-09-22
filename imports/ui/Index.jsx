import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { TaskForm } from './TaskForm';

export const Index = () => {
    const user = useTracker(() => Accounts.user());

    return (
        <>
            {user ? (
                <Fragment>
                    <TaskForm user />
                </Fragment>
            ) : (
                <LoginForm />
            )}
        </>
    )
}