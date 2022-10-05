import { Button, FormLabel, List, ListItem, TextField } from '@material-ui/core';
import React from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskIcon from '@mui/icons-material/Task';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const EditaTask = () => {

    const id = useParams();
    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const task = tasks.filter(o => o._id === id.id);
    const navi = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [text, setText] = useState("");
    const drawerWidth = 240;

    const submit = e => {
        console.log("entra aqui")
        e.preventDefault();

        if ((titulo != '' && text != '')) {
            Meteor.call('alterTask', task[0], titulo, text);
            console.log("altera os dois");
            alert('Título e Texto da Tarefa alterados.')
            navi(-1);
        } else if (titulo != '') {
            Meteor.call('alterTask', task[0], titulo, task[0].text);
            alert('Título da Tarefa alterado.');
            console.log("altera titulo");
            navi(-1);
        } else if (text != '') {
            Meteor.call('alterTask', task[0], task[0].titulo, text);
            alert('Texto da Tarefa alterado.');
            console.log("altera text");
            navi(-1);
        } else {
            alert('Nenhum dado modificado');
            navi(-1);
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar className='tolbar'>
                        <span id='nome-draw'>
                            Olá <b>{Accounts.user().username}</b>,<br />
                            {Accounts.user().emails[0].address}
                        </span>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem >
                            <ListItemButton onClick={() => { navi('/') }} >
                                <ListItemIcon >
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Página Inicial'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton onClick={() => { navi('/tarefas') }} >
                                <ListItemIcon >
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Meus Dados'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton onClick={() => { navi('/tarefas') }}>
                                <ListItemIcon>
                                    <TaskIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Tarefas'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Button id="button-task" onClick={() => {
                        Accounts.logout();
                    }}>Sair</Button>
                </Drawer>
            </Box>
            <div id='tarefa'>
                <FormLabel><span id='fonte'>Edição de Tarefa </span></FormLabel>
                <hr />
                <FormLabel><span className='list-tar'><b>TÍTULO ATUAL:</b></span></FormLabel>{task[0].titulo} <br />
                <TextField placeholder='novo título' type="text" id="titulotarefa" className='alter-task' variant='outlined' onChange={(e) => setTitulo(e.target.value)} /><br /><br />
                <FormLabel><span className='list-tar'><b>TEXTO ATUAL:</b></span></FormLabel>{task[0].text} <br />
                <TextField type="text" placeholder='novo texto' id='texto-tarefa-edicao' variant='outlined' className='alter-task' onChange={(e) => setText(e.target.value)} />
                <br /><br />
                <Button id="button-task" onClick={submit}>Salvar</Button>
                <Button id="button-task" onClick={() => { navi(-1) }} >Voltar</Button>
            </div>
        </>
    )
}
