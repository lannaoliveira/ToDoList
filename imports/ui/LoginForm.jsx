import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
    };

    return (
        <form onSubmit={submit} className="login-form">
            <div id="login">
                <div id="info-login">
                    <label>Bem Vindo à sua <br /> Lista de Tarefas!</label><br /><br />
                    <input type="text" placeholder="informe seu usuario" name='username'
                        onChange={e => setUsername(e.target.value)} /><br /><br />
                    <input type="password" placeholder="informe sua senha" name="password"
                        required
                        onChange={e => setPassword(e.target.value)} /><br /><br />
                    <button type="submit" id="button-login-out">Entrar</button><br /><br />
                    <Link to='/recuperasenha' id="cadastro-login" title="Cadastre-se">Esqueci minha senha</Link>
                </div>
            </div>
        </form>
    );
};