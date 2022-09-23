import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { UserArea } from './UserArea';
import { TasksCollection } from '/imports/api/TasksCollection';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useTracker } from 'meteor/react-meteor-data';

export const TaskForm = () => {
    const [titulo, setTitulo] = useState("");
    const [text, setText] = useState("");
    const user = useTracker(() => Accounts.user().username);

    const handleSubmit = e => {
        e.preventDefault();

        if (!text && !titulo) return;

        TasksCollection.insert({
            titulo: titulo.trim(),
            text: text.trim(),
            createdAt: new Date(),
            userLog: user,
        });

        setText("");
    };

    return (
        <div id='tarefa'>
            <form onSubmit={handleSubmit}>
                <h1 id='info-task'>Nova Tarefa</h1>
                <br /><br />
                <Input id="info-task" placeholder='titulo da tarefa' onChange={(e) => setTitulo(e.target.value)} />
                <br /><br />
                <Input id="info-task" placeholder='tarefa' onChange={(e) => setText(e.target.value)} />
                <br /><br />
                <Button id="button-task" type="submit">Adicionar Tarefa</Button>
            </form>
            <UserArea />
        </div >
    );
};