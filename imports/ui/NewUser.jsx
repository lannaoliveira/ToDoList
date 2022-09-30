import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button, FormLabel } from '@material-ui/core';
import { UserCollection } from '/imports/api/UserCollection';

export const NewUser = () => {

    const [nameUser, setNameUser] = useState('');
    const [pswUser, setPswUser] = useState('');
    const [emailUser, setEmail] = useState('');

    const submit = () => {

        Meteor.call('findUser', emailUser, findUserCallBack);

        function sucessUserCallBackUser() {
            alert(`Usuario ${nameUser} cadastrado com sucesso.`);
        }

        function findUserCallBackUser(error, usuario) {
            if (usuario == undefined) {
                Accounts.createUser({
                    email: emailUser,
                    username: nameUser,
                    password: pswUser,
                });

                UserCollection.insert({
                    username: nameUser,
                    data: null,
                    sexo: null,
                    empresa: null,
                    verifica: false,
                });
                sucessUserCallBackUser();
            } else {
                alert(`Nome de usuario ja utilizado. Utilize outro nome ou a opção de redefinir senha.`);
            }
        }

        function sucessUserCallBack() {
            Meteor.call('findUserName', nameUser, findUserCallBackUser);
        }

        function findUserCallBack(error, usuario) {
            if (usuario == undefined) {
                sucessUserCallBack();
            } else {
                alert(`E-mail ja utilizado. Utilize outro e-mail ou a opção de redefinir senha.`);
            }
        }
    }

    return (
        <>
            <header id='cabecalho'></header>
            <div id="login">
                <div id="info-login">
                    <FormLabel>CADASTRO</FormLabel><br /><br />
                    <TextField
                        className='info-user'
                        required={true}
                        label="nome"
                        variant="outlined"
                        type="text"
                        name='nameUser'
                        onChange={e => setNameUser(e.target.value)} />
                    <br /><br />
                    <TextField
                        required={true}
                        className='info-user'
                        label="email"
                        variant="outlined"
                        type="email"
                        name='e-mail'
                        onChange={e => setEmail(e.target.value)} />
                    <br /><br />
                    <TextField
                        required={true}
                        className='info-user'
                        label="senha"
                        type="password"
                        autoComplete="senha"
                        name={'pswUser'}
                        onChange={e => setPswUser(e.target.value)} />
                    <br /><br />
                    <Button onClick={submit} id="button-login">Cadastrar</Button>
                    <br /><br />
                    <Link to='/' id="link" title="Voltar">Voltar para tela de login</Link><br />
                </div>
            </div>
        </>
    );
};
