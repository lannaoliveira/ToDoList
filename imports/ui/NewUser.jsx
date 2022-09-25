import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button, FormLabel } from '@material-ui/core';

export const NewUser = () => {

    const [nameUser, setNameUser] = useState('');
    const [pswUser, setPswUser] = useState('');
    const [emailUser, setEmail] = useState('');
    const [dataNascUser, setDataNascUser] = useState('');
    const [sexoUser, setSexoUser] = useState('');
    const [empresaUser, setEmpresa] = useState('');

    const submit = () => {
        if (!Meteor.call('findUser', nameUser, findUserCallBack)) {
            Accounts.createUser({
                username: nameUser,
                password: pswUser,
            }
            );
        }
    }

    function sucessUserCallBack() {
        alert(`Usuario ${nameUser} cadastrado com sucesso.`);
    }

    function findUserCallBack(error, usuario) {
        alert(`Nome de usuario: ${usuario.username} ja utilizado. Utilize outro nome ou a opção de redefinir senha.`);
    }

    return (
        <>
            <header id='cabecalho'></header>
            <form onSubmit={submit} className="login-form">
                <div id="login">
                    <div id="info-login">
                        <FormLabel>CADASTRO</FormLabel><br /><br />
                        <TextField
                            id='info-user'
                            label="nome de usuario"
                            variant="outlined"
                            type="text"
                            name='nameUser'
                            onChange={e => setNameUser(e.target.value)} />
                        <br /><br />
                        <TextField
                            id="info-user"
                            label="senha"
                            type="password"
                            autoComplete="senha"
                            name={'pswUser'}
                            onChange={e => setPswUser(e.target.value)} />
                        <br /><br />
                        <Button type="submit" id="button-login">Cadastrar</Button>
                        <br /><br />
                        <Link to='/' id="link" title="Voltar">Voltar para tela de login</Link><br />
                    </div>
                </div>
            </form>
        </>
    );
};
