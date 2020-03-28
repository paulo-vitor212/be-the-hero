import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css";  
import './styles.css';
import api from '../../services/api';

const NewIncident = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    const handleNewIncident = async e => {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try{
            const response = await api.post('incidents',data, {
                headers:{
                    Authorization: ongId
                }
            })
            if(response.data.status === "error"){
                throw response;
            }
            new Noty({
                type: 'success',
                layout: 'topRight',
                text: `Caso cadastrado com sucesso`,
                timeout: 4000
            }).show();
            history.push('/profile')
        }catch(err){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: `Erro ao cadastrar este caso, tente novamente`,
                timeout: 4000
            }).show();
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    />
                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>   
    )
}

export default NewIncident;

