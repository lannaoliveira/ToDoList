import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Button, List, ListItem } from '@material-ui/core';
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
import { TaskForm } from './TaskForm';

export const Index = () => {

    const user = useTracker(() => Accounts.user());
    const drawerWidth = 240;

    return (
        <>
            {user ? (
                <Fragment>
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
                                <span> Olá <b>{Accounts.user().username}</b>,</span><HomeIcon />
                                <br />

                            </Toolbar>
                            <Divider />
                            <List>
                                {['Meus Dados', 'Tarefas'].map((text, index) => (
                                    <ListItem key={text}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <AccountCircleIcon /> : <TaskIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button className='blogoff' onClick={() => {
                                Accounts.logout()
                            }}><b>Sair</b><LogoutIcon /></Button>
                        </Drawer>
                    </Box>
                    <TaskForm />
                </Fragment>
            ) : (
                <LoginForm />
            )}

        </>
    )
}