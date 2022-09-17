import React, { useState } from 'react';
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
        <div id="tarefa">
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
                <button id="button-task" type="submit">Adicionar Tarefa</button>
            </form>
        </div>
    );
};