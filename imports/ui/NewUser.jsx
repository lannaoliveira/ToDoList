import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';

export const NewUser = () => {

    const [nameUser, setNameUser] = useState('');
    const [pswUser, setPswUser] = useState('');

    const submit = () => {
        if (!Meteor.call('findUser', nameUser, findUserCallBack)) {
            Accounts.createUser({
                username: nameUser,
                password: pswUser,
            }
            );
            alert(`${nameUser} cadastrado com sucesso!`);
        }
    }

    function findUserCallBack(error, usuario) {
        alert(`Nome de usuario: ${usuario.username} ja utilizado. Tente novamente.`);
    }

    return (
        <form onSubmit={submit} className="login-form">
            <div id="login">
                <div id="info-login">
                    <label>CADASTRO</label><br /><br />
                    <input type="text" placeholder="nome de usuario" name='username-novo' onChange={e => setNameUser(e.target.value)} /><br /><br />
                    <input type="password" placeholder="senha" name="password-novo" onChange={e => setPswUser(e.target.value)} /><br /><br />
                    <button type="submit" id="button-login"><b>Cadastrar</b></button><br /><br />
                </div>
            </div>
        </form>
    );
};
