import { Button, FormLabel, List, ListItem, TextField } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import React, { useState } from 'react';
import { UserArea } from './UserArea';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LogoutIcon from '@mui/icons-material/Logout';

export const TaskForm = () => {
    const [titulo, setTitulo] = useState("");
    const [pessoal, setPessoal] = useState("");
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");
    const user = useTracker(() => Accounts.user().username);

    const handleSubmit = e => {
        e.preventDefault();

        if (!text && !titulo) return;

        TasksCollection.insert({
            titulo: titulo.trim(),
            text: text.trim(),
            createdAt: new Date(),
            userLog: user,
            pessoal: pessoal,
            status: status
        });

        setText("");
    };

    return (
        <>
            <header id='cabecalho'></header>
            <div id='tarefa'>
                <span className="button-logoff"> Olá <b>{Accounts.user().username}</b>,</span>
                <br />
                <Button className="button-logoff" onClick={() => {
                    Accounts.logout()
                }}><LogoutIcon /></Button>
                <br /><br />
                <FormLabel className='for-label'><span id='fonte'>Nova Tarefa</span></FormLabel>
                <form onSubmit={handleSubmit}>
                    <List>
                        <ListItem><TextField id="info-task" variant="outlined" placeholder='titulo da tarefa' onChange={(e) => setTitulo(e.target.value)} /></ListItem>
                        <ListItem><TextField id="info-task" variant="outlined" placeholder='tarefa' onChange={(e) => setText(e.target.value)} /></ListItem>
                        <ListItem>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                aria-required="true"
                            >
                                <FormLabel className='for-label'><span id='fonte'>Tarefa Pessoal?</span></FormLabel>
                                <ListItem>
                                    <FormControlLabel value='sim' control={<Radio size="small" onChange={(e) => setPessoal(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Sim</span>} />
                                    <FormControlLabel value='nao' control={<Radio size="small" onChange={(e) => setPessoal(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Não</span>} />
                                </ListItem>
                            </RadioGroup>
                        </ListItem>
                    </List>
                    <Button id="button-task" type="submit">Adicionar Tarefa</Button>
                </form>
                <br />
                <h1> Tarefas </h1>
                <UserArea />
            </div >
        </>
    );
};