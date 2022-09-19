import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export const NewUser = () => {

    const [nameUser, setNameUser] = useState('');
    const [pswUser, setPswUser] = useState('');

    const submit = () => {
        if (Meteor.call('findUser', nameUser, findUserCallBack)) {
            Accounts.createUser({
                username: nameUser,
                password: pswUser,
            }
            );
        }
    }

    function findUserCallBack(error, usuario) {
        alert(`Nome de usuario: ${usuario.username} ja utilizado. Tente novamente.`);
    }

    return (
        <form onSubmit={submit} className="login-form">
            <div id="login">
                <div id="info-cadastro">
                    <label>CADASTRO</label><br /><br />
                    <input type="text" placeholder="nome de usuario" name='username-novo' onChange={e => setNameUser(e.target.value)} /><br /><br />
                    <input type="password" placeholder="senha" name="password-novo" onChange={e => setPswUser(e.target.value)} /><br /><br />
                    <button type="submit" id="button-login-out"><b>Cadastrar</b></button><br /><br />
                    <Link to='/' id="cadastro-login" title="Voltar">Voltar para tela de login</Link><br />
                </div>
            </div>
        </form>
    );
};
