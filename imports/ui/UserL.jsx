import { UserCollection } from '/imports/api/UserCollection';
import { Button, FormLabel, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export const UserL = () => {

    const usersL = useTracker(() => UserCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const [idUser, setIdUser] = useState('');

    return (
        <>
            <div className='usuario-dados'>
                <FormLabel className='for-label'><span id='fonte'>Meus Dados</span></FormLabel>
                <form>
                    {usersL.map(userLL => (
                        setIdUser(userLL._id),
                        <List>
                            <ListItem><b>NOME:</b><ListItem className='dados-user'> {Accounts.user().username}</ListItem></ListItem>
                            <ListItem><b>E-MAIL: </b><ListItem className='dados-user'> { }</ListItem></ListItem>
                            <ListItem><b>DATA DE NASCIMENTO: </b><ListItem className='dados-user'> {userLL.data}</ListItem></ListItem>
                            <ListItem><b>EMPRESA: </b><ListItem className='dados-user'>{userLL.empresa}</ListItem></ListItem>
                            <ListItem><b>SEXO: </b><ListItem className='dados-user'> {userLL.sexo}</ListItem></ListItem>
                        </List>
                    ))
                    }
                    <Button id="button-task" type="submit">Editar Dados</Button>
                </form>
            </div >
        </>
    )
}
