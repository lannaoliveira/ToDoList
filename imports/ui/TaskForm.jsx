import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { UserArea } from './UserArea';
import { TasksCollection } from '/imports/api/TasksCollection';

export const TaskForm = () => {
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
        <div id="login">
            <div id="info-login">
                <form className="task-form" onSubmit={handleSubmit}>
                    <label>Lista de <b>TAREFAS</b></label>
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Digite aqui sua nova tarefa"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <blockquote />
                    <Button id="button-task" type="submit">Adicionar Tarefa</Button>
                </form>
            </div>
            <UserArea />
        </div>
    );
};