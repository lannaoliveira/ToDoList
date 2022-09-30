import { UserCollection } from '/imports/api/UserCollection';
import { Button, FormLabel, List, ListItem, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const EditUser = ({ key }) => {

    const [dataNascUser, setDataNascUser] = useState('');
    const [sexoUser, setSexoUser] = useState('');
    const [empresaUser, setEmpresa] = useState('');
    const [foto, setFoto] = useState('');

    const mySubmit = e => {
        e.preventDefault();

        UserCollection.update(key, {
            $set: {
                data: dataNascUser,
                sexo: sexoUser,
                empresa: empresaUser,
            }
        });
    }

    return (
        <div id='tarefa'>
            <FormLabel className='for-label'><span id='fonte'>Meus Dados</span></FormLabel>
            <form onSubmit={mySubmit}>
                <List>
                    <ListItem>
                        <TextField id="info-task" variant="outlined" type="date" onChange={(e) => setDataNascUser(e.target.value)} />
                    </ListItem>
                    <ListItem>
                        <TextField id="info-task" variant="outlined" label="empresa" type="text" onChange={(e) => setEmpresa(e.target.value)} />
                    </ListItem>
                    <ListItem>
                        <TextField id="info-task" variant="outlined" label="email" type="email" />
                    </ListItem>
                    <ListItem>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            aria-required="true"
                        >
                            <FormLabel><span id='fonte'>Sexo:</span></FormLabel>
                            <ListItem>
                                <FormControlLabel value='f' control={<Radio size="small" onChange={(e) => setSexoUser(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Feminino</span>} />
                                <FormControlLabel value='m' control={<Radio size="small" onChange={(e) => setSexoUser(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Masculino</span>} />
                                <FormControlLabel value='o' control={<Radio size="small" onChange={(e) => setSexoUser(e.target.value)} />} label={<span id='fonte' style={{ fontSize: '16px', color: 'gray' }}>Outro</span>} />
                            </ListItem>
                        </RadioGroup>
                    </ListItem>
                </List>
                <Button id="button-task" type="submit">Salvar Dados</Button>
            </form>
        </div >
    )
}