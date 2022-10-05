import { Button, FormLabel, List, ListItem, TextField } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import React, { useState } from 'react';
import { UserArea } from './UserArea';
import { TasksCollection } from '/imports/api/TasksCollection';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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

export const TaskForm = () => {
    const [titulo, setTitulo] = useState("");
    const [pessoal, setPessoal] = useState("");
    const [text, setText] = useState("");
    const user = Accounts.user().username;
    const data = new Date();
    const drawerWidth = 240;
    const navi = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        TasksCollection.insert({
            titulo: titulo.trim(),
            text: text.trim(),
            dataCriacao: data.toLocaleDateString(),
            dataUltimaAlt: data.toLocaleDateString(),
            userLog: user,
            pessoal: pessoal,
            status: 'Cadastrada',
            isChecked: false,
        });

        setText("");
    };

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
                            <ListItemButton onClick={() => { navi('/usuario') }} >
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
                                Accounts.logout(), navi('/');
                            }}>Sair</Button>
                </Drawer>
            </Box>
            <div id='tarefa'>
                <FormLabel className='for-label'><span id='fonte'>Nova Tarefa</span></FormLabel>
                <form onSubmit={handleSubmit}>
                    <List>
                        <ListItem>
                            <TextField id="info-task" variant="outlined" placeholder='titulo da tarefa' onChange={(e) => setTitulo(e.target.value)} />
                            <ListItem>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    aria-required="true"
                                >
                                    <FormLabel><span id='fonte-tarefa'>Tarefa Pessoal?</span></FormLabel>
                                    <ListItem>
                                        <FormControlLabel value='sim' control={<Radio size="small" onChange={(e) => setPessoal(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Sim</span>} />
                                        <FormControlLabel value='nao' control={<Radio size="small" onChange={(e) => setPessoal(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Não</span>} />
                                    </ListItem>
                                </RadioGroup>
                            </ListItem>
                        </ListItem>
                        <ListItem>
                            <TextField id="info-task" variant="outlined" placeholder='tarefa' onChange={(e) => setText(e.target.value)} />
                        </ListItem>
                    </List>
                    <Button id="button-task" type="submit">Adicionar Tarefa</Button>
                </form>
                <h1><span id="fonte"> Tarefas </span></h1>
                <div id='observacao'>**Tarefas privadas de outros usuários não serão exibidas, mas serão contabilizadas.</div>
                <hr />
                <UserArea />
            </div >
        </>
    );
};