import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';

import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css";  

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

const Logon = () => {

    const [id, setId] = useState('');
    const history = useHistory();
    
    const handleLogin = async e => {
        e.preventDefault();

        try{
            const response = await api.post('session', {id});
            
            if(response.data.status === "error"){
                throw response;
            }
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')
        }catch(err){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: `Falha no login, tente novamente`,
                timeout: 4000
            }).show();
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt=""/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID" required value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt=""/>
        </div>
    );
}

export default Logon;
