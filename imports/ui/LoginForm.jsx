import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { NewUser } from './NewUser';

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
                    <a href="#" id="cadastro-login" title="Cadastre-se">Não tem cadastro? Cadastre-se!</a><br />
                    <a href="#" id="cadastro-login" title="Esqueceu a Senha">Esqueci minha senha</a>
                </div>
            </div>
        </form>
    );
};