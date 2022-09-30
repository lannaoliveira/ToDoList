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

export const UserL = () => {

    const drawerWidth = 240;
    const usersL = useTracker(() => UserCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const usersLL = usersL.filter(o => o.username === Accounts.user().username);
    const navi = useNavigate();

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
                    <Button className='blogoff' onClick={() => {
                        Accounts.logout()
                    }}><b>Sair</b><LogoutIcon /></Button>
                </Drawer>
            </Box>
            <div className='usuario-dados'>
                <FormLabel className='for-label'><span id='fonte'>Meus Dados</span></FormLabel>
                <List>
                    <ListItem><b>Username: </b> {Accounts.user().username}</ListItem>
                    <ListItem><b>E-mail: </b> {Accounts.user().emails[0].address}</ListItem>
                    <ListItem><b>Empresa: </b> {usersLL[0].empresa}</ListItem>
                    <ListItem><b>Sexo: </b> {usersLL[0].sexo}</ListItem>
                </List>
                <Button id="button-task" type="submit">Editar Dados</Button>
            </div >
        </>
    )
}
