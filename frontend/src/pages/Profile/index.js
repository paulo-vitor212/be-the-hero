import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css";  
import './styles.css';

import api from '../../services/api';

const Profile = () => {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('/incidentsOng',{
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    const handleDeleteIncident = async (id) =>{
        try{
            const response = await api.delete(`incidents/${id}`, {
                headers:{Authorization: ongId}
            });
            if(response.data.status === "error"){
                throw response;
            }
            new Noty({
                type: 'success',
                layout: 'topRight',
                text: `Caso deletado com sucesso`,
                timeout: 4000
            }).show();

            setIncidents(incidents.filter(incident => incident.id !== id ))
        }catch(err){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: `Erro ao deletar caso`,
                timeout: 4000
            }).show();
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero"></img>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b1"/>
                    </button>

                    {/* <button type="button">
                        <FiEdit size={20} color="#a8a8b1"/>
                    </button> */}
                </li>
                ))}
            </ul>

        </div>
    )
}

export default Profile;