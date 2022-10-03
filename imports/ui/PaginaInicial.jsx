import * as React from 'react';
import { List, ListItem } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';

export const PaginaInicial = () => {

    const drawerWidth = 240;
    const navi = useNavigate();
    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const taskCadastrada = tasks.filter(o => o.status === 'Cadastrada');
    const taskAndamento = tasks.filter(o => o.status === 'Andamento');
    const taskConcluida = tasks.filter(o => o.status === 'Concluída');

    const sair = () => {
        Accounts.logout();
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
                    <Button className='blogoff' onClick={() => { sair }}><b>Sair</b><LogoutIcon /></Button>
                </Drawer>
            </Box>
            <div id='tarefa'>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Total de Tarefas
                        </Typography>
                        <Typography variant="h5" component="div">
                            Cadastradas
                        </Typography>
                        <Typography variant="h3" component="div">
                            {taskCadastrada.length}
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Total de Tarefas
                        </Typography>
                        <Typography variant="h5" component="div">
                            Em Andamento
                        </Typography>
                        <Typography variant="h3" component="div">
                            {taskAndamento.length}
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Total de Tarefas
                        </Typography>
                        <Typography variant="h5" component="div">
                            Concluídas
                        </Typography>
                        <Typography variant="h3" component="div">
                            {taskConcluida.length}
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                <Button id="button-task" onClick={() => { navi('/tarefas') }} >Visualizar Tarefas</Button>
            </div>
        </>
    )
}