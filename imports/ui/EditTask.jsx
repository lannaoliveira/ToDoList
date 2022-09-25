import React from 'react';
import { Button, FormLabel, List, ListItem, TextField } from '@material-ui/core';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useNavigate } from 'react-router-dom';

export const EditTask = () => {

    const navigate = useNavigate();

    const voltaTela = () => {
        navigate('/tarefas');
    }

    return (
        <div id='tarefa'>
            <FormLabel className='for-label'>Tarefa</FormLabel>
            <List>
                <ListItem><TextField id="info-task" variant="outlined" /></ListItem>
                <ListItem><TextField id="info-task" variant="outlined" /></ListItem>
                <ListItem>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        aria-required="true"
                    >
                        <FormLabel className='for-label'>Tarefa Pessoal?</FormLabel>
                        <ListItem>
                            <FormControlLabel value='sim' control={<Radio size="small" />} label={<span id='radio-button' style={{ fontSize: '16px', color: 'gray' }}>Sim</span>} />
                            <FormControlLabel value='nao' control={<Radio size="small" />} label={<span id='radio-button' style={{ fontSize: '16px', color: 'gray' }}>Não</span>} />
                        </ListItem>
                    </RadioGroup>
                </ListItem>
            </List>
            <Button id="button-task" type="submit" onClick={() => { voltaTela }}>Voltar</Button>
        </div>
    )
}
