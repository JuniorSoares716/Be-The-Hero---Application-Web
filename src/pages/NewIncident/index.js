import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import logoImg from "../../assets/logo.svg";
import './styles.css';



export default function NewIncident(){

    const history = useHistory()
    const [title, setTitle] = useState('');
    const [descripition, setDescripition] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    console.log(ongId);
    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            descripition,
            value,
        };
        // console.log(data);

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization:ongId
                 }
            });
            history.push('/profile');
        } catch (error) {
            alert("Erro ao cadastrar");
        } 
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt=""/>
                <h1>Cadastro novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
                <textarea 
                    placeholder="Descrição"
                    value={descripition}
                    onChange={e => setDescripition(e.target.value)}/>
                <input 
                    placeholder="valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}/>
                <button type="submit" className="button">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}