import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, FormLabel, MenuItem, Select } from '@material-ui/core';
import { UserCollection } from '/imports/api/UserCollection';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

export const NewUser = () => {

    const [nameUser, setNameUser] = useState('');
    const [pswUser, setPswUser] = useState('');
    const [emailUser, setEmail] = useState('');
    const [dataNasc, setDataNascUser] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [sexo, setSexo] = useState('');
    const navi = useNavigate();

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
                    dataNasc: dataNasc,
                    sexo: sexo,
                    empresa: empresa,
                    foto: null,
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

    const handleChange = (e) => {
        setSexo(e.target.value);
    };

    return (
        <>
            <header id='cabecalho'></header>
            <div id="login">
                <div id="info-login-cadastro">
                    <FormLabel id="texto-cadastro">CADASTRO</FormLabel><br /><br />
                    <TextField
                        className='cadastro-user'
                        required={true}
                        label="nome"
                        variant="outlined"
                        type="text"
                        name='nameUser'
                        onChange={e => setNameUser(e.target.value)} />
                    <TextField
                        className='cadastro-user'
                        required={true}
                        label="email"
                        variant="outlined"
                        type="email"
                        name='e-mail'
                        onChange={e => setEmail(e.target.value)} />
                    <TextField
                        className='cadastro-user'
                        required={true}
                        label="senha"
                        type="password"
                        autoComplete="senha"
                        name={'pswUser'}
                        onChange={e => setPswUser(e.target.value)} />
                    <TextField
                        className='cadastro-user'
                        required={true}
                        label="empresa"
                        type="text"
                        autoComplete="empresa"
                        name={'empresa'}
                        onChange={e => setEmpresa(e.target.value)} />
                    <TextField
                        className='cadastro-um'
                        required={true}
                        type="date"
                        name={'data'}
                        onChange={e => setDataNascUser(e.target.value)} />
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            className='cadastro-um'
                            onChange={handleChange}
                        >
                            <MenuItem value={'Feminino'}>Feminino</MenuItem>
                            <MenuItem value={'Masculino'}>Masculino</MenuItem>
                            <MenuItem value={'Outro'}>Outro</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <Button onClick={submit} id="button-task">Cadastrar</Button>
                    <Button id="button-task" onClick={() => { navi(-1) }} >Voltar</Button>
                </div>
            </div>
        </>
    );
};
