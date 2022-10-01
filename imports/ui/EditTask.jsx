import { Button, FormLabel, List, ListItem } from '@material-ui/core';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export const EditTask = () => {

    const id = useParams();
    const [botao, setBotao] = useState(true);
    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const task = tasks.filter(o => o._id === id.id);
    const navi = useNavigate();
    const drawerWidth = 240;

    function alteraStatus() {
        if (task[0].status === 'Cadastrada') {
            task.map(e => {
                Meteor.call('mudaStatus', e, 'Andamento');
            })
        }
        setBotao(false);
    }

    function reiniciaStatus() {
        task.map(e => {
            Meteor.call('mudaStatus', e, 'Cadastrada');
        });
        setBotao(true);
    }

    function concluiTarefa() {
        task.map(e => {
            Meteor.call('mudaStatus', e, 'Concluída');
            Meteor.call('checaStatus', e, e.isChecked);
        });
        setBotao(true);
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
                        <span> Olá <b>{Accounts.user().username}</b>,</span>
                        <br />
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem >
                            <ListItemButton onClick={() => { navi('/usuario') }} >
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
                    <Button className='blogoff' onClick={() => {
                        Accounts.logout()
                    }}><b>Sair</b><LogoutIcon /></Button>
                </Drawer>
            </Box>
            <div id='tarefa'>
                <FormLabel><span id='fonte'>Tarefa </span></FormLabel>
                <hr />
                <List>
                    <ListItem ><span className='list-tar'><b>TÍTULO:</b></span> {task[0].titulo}</ListItem>
                    <ListItem ><span className='list-tar'><b>DESCRIÇÃO:</b></span> {task[0].text}</ListItem>
                    <ListItem ><span className='list-tar'><b>USUÁRIO:</b></span> {task[0].userLog}</ListItem>
                    <ListItem ><span className='list-tar'><b>DATA CRIAÇÃO:</b></span> {task[0].dataCriacao}</ListItem>
                    <ListItem ><span className='list-tar'><b>DATA ÚLTIMA ALTERAÇÃO:</b></span> {task[0].dataUltimaAlt}</ListItem>
                    <ListItem><span className='list-tar'><b>STATUS:</b></span> {task[0].status}
                        <ListItem>
                            <Button id="button-alt" onClick={alteraStatus}>Alterar Status</Button>
                            <Button id="button-alt" onClick={reiniciaStatus}>Reiniciar Status</Button>
                            <Button id="button-alt" disabled={botao} onClick={concluiTarefa}>Concluir Tarefa</Button>
                        </ListItem>
                    </ListItem>
                </List>
                <Button id="button-task" >Editar Dados</Button>
                <Button id="button-task" onClick={() => { navi('/') }} >Voltar</Button>
            </div>
        </>
    )
}
