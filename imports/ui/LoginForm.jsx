import { Button } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(email, password);
    };

    return (
        <>
            <header id='cabecalho'>
                <br />
                <Link to={'/cadastro'} id="link-cabecalho" title="Cadastre-se">Não tem cadastro? Cadastre-se!</Link>
            </header>
            <form onSubmit={submit}>
                <div id="login">
                    <div id="info-login">
                        <h1 id='texto-inicial'>Bem Vindo à sua <br /> Lista de Tarefas!</h1><br />
                        <TextField
                            className='info-user'
                            required={true}
                            label="e-mail"
                            variant="outlined"
                            type="text"
                            name='e-mail'
                            onChange={e => setEmail(e.target.value)} />
                        <br /><br />
                        <TextField
                            required={true}
                            className='info-user'
                            label="senha"
                            type="password"
                            autoComplete="senha"
                            onChange={e => setPassword(e.target.value)} />
                        <br /><br /><br />
                        <Button type="submit" id="button-login">Entrar</Button><br /><br />
                    </div>
                </div>
            </form>
        </>
    );
};