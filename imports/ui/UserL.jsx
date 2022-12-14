import { UserCollection } from '/imports/api/UserCollection';
import { Button, FormLabel, List, ListItem } from '@material-ui/core';
import React from 'react';
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
import { useState } from 'react';

export const UserL = () => {

    const drawerWidth = 240;
    const usersL = useTracker(() => UserCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const usersLL = usersL.filter(o => o.username === Accounts.user().username);
    const navi = useNavigate();
    const dataNiver = usersLL[0].dataNasc.split('-').reverse().join('/');
    const [img, setImg] = useState('');

    function carregaImg() {
        console.log("entra aqui");
        let file = img.replace(/^data:image\/[a-z]+;base64,/, "");
        let imagem = `data:image/png;base64,${file}`;
        Meteor.call('addImg', usersLL[0], imagem);
        alert('Imagem adicionada');
        navi('/');
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
                            Ol?? <b>{Accounts.user().username}</b>,<br />
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
                                <ListItemText primary={'P??gina Inicial'} />
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
                        Accounts.logout();
                    }}>Sair</Button>
                </Drawer>
            </Box>
            <div id='tarefa'>
                <FormLabel className='for-label'><span id='fonte'>Meus Dados</span></FormLabel>
                <hr />
                <List>
                    <ListItem><span className='list-tar'><b>USERNAME:</b></span> {Accounts.user().username}</ListItem>
                    <ListItem><span className='list-tar'><b>E-MAIL:</b></span> {Accounts.user().emails[0].address}</ListItem>
                    <ListItem><span className='list-tar'><b>DATA NASCIMENTO:</b></span> {dataNiver}</ListItem>
                    <ListItem><span className='list-tar'><b>EMPRESA:</b></span> {usersLL[0].empresa}</ListItem>
                    <ListItem><span className='list-tar'><b>SEXO:</b></span> {usersLL[0].sexo}</ListItem>
                </List>
                <FormLabel className='imagem-perfil'><span className='list-tar'>Alterar imagem do perfil:</span></FormLabel><br />
                <input type="file" id='imagem' onChange={e => setImg(e.target.value)} /><br /><br />
                <Button id="button-task" onClick={carregaImg} >Salvar</Button>
                <Button id="button-task" onClick={() => { navi(-1) }} >Voltar</Button>
            </div >
        </>
    )
}
