import React from 'react';
import {Link} from 'react-router-dom';
import {FiPower,FiTrash2, FiEdit} from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';

const Profile = () => {
    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero"></img>
                <span>Bem vinda, APAD</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso Teste</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR</strong>
                    <p>R$ 120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b1"/>
                    </button>

                    <button type="button">
                        <FiEdit size={20} color="#a8a8b1"/>
                    </button>
                </li>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso Teste</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR</strong>
                    <p>R$ 120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b1"/>
                    </button>

                    <button type="button">
                        <FiEdit size={20} color="#a8a8b1"/>
                    </button>
                </li>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso Teste</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR</strong>
                    <p>R$ 120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b1"/>
                    </button>

                    <button type="button">
                        <FiEdit size={20} color="#a8a8b1"/>
                    </button>
                </li>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso Teste</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR</strong>
                    <p>R$ 120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b1"/>
                    </button>

                    <button type="button">
                        <FiEdit size={20} color="#a8a8b1"/>
                    </button>
                </li>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso Teste</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>Descrição teste</p>

                    <strong>VALOR</strong>
                    <p>R$ 120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b1"/>
                    </button>

                    <button type="button">
                        <FiEdit size={20} color="#a8a8b1"/>
                    </button>
                </li>
            </ul>

        </div>
    )
}

export default Profile;