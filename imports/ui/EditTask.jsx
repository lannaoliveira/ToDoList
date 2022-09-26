import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EditTask = () => {

    const navigate = useNavigate();

    const voltaTela = e => {
        e.preventDefault();
        navigate('/tarefas');
    }

    return (
        <>
        </>
    )
}
