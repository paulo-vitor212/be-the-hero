import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css";  
import './styles.css';

import api from '../../services/api';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            name,
            email,
            city,
            whatsapp,
            uf
        }

        try{
            const response = await api.post('ongs',data);
            if(response.data.status === "error"){
                throw response;
            }
            alert(`Seu ID de acesso: ${response.data.id}`);

            setName('');
            setEmail('');
            setCity('');
            setWhatsapp('');
            setUf('');

            history.push('/');

        }catch(err){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: `Erro ao cadastrar uma ong`,
                timeout: 4000
            }).show();
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>    
    )
}

export default Register;