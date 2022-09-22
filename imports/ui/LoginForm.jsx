import { Button } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
    };

    return (
        <form onSubmit={submit}>
            <header>
                <Link to={'/recuperasenha'} id="link" title="RecuperaSenha">Esqueci minha senha</Link><br />
                <Link to={'/cadastro'} id="link" title="Cadastre-se">Não tem cadastro? Cadastre-se!</Link><br />
            </header>
            <div id="login">
                <div id="info-login">
                    <label>Bem Vindo à sua <br /> Lista de Tarefas!</label><br /><br />
                    <TextField
                        id='info-user'
                        label="nome de usuario"
                        variant="outlined"
                        type="text"
                        name='username'
                        onChange={e => setUsername(e.target.value)} />
                    <br /><br />
                    <TextField
                        id="info-user"
                        label="senha"
                        type="password"
                        autoComplete="senha"
                        onChange={e => setPassword(e.target.value)} />
                    <br /><br />
                    <Button type="submit" id="button-login">Entrar</Button><br /><br />
                </div>
            </div>
        </form>
    );
};