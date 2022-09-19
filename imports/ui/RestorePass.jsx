import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const RestorePass = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        if (Meteor.call('findUser', username)) {
            Accounts.createUser({
                username: username,
                password: password,
            }
            );
        }
    }

    return (
        <form onSubmit={submit} className="login-form">
            <div id="login">
                <div id="info-cadastro">
                    <label>RECUPERAÇÃO DE SENHA</label><br /><br />
                    <Link to='/' id="cadastro-login" title="Voltar">Voltar para tela de login</Link><br />
                </div>
            </div>
        </form>
    );
}