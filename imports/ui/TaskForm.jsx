import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { UserArea } from './UserArea';
import { TasksCollection } from '/imports/api/TasksCollection';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export const TaskForm = (user) => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date()
        });

        setText("");
    };

    return (
        <div id='tarefa'>
            <form onSubmit={handleSubmit}>
                <label>Lista de <b>TAREFAS</b></label>
                <br /><br />
                <InputLabel id="info-user" htmlFor="component-simple">Tarefa</InputLabel>
                <Input id="info-task" onChange={(e) => setText(e.target.value)} />
                <br /><br />
                <Button id="button-task" type="submit">Adicionar Tarefa</Button>
            </form>
            <UserArea user />
        </div>
    );
};