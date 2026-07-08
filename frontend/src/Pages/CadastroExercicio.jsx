import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Assets/HomePage.css';
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import "../Assets/Forms.css";
import addIcon from '../Assets/add-64px.png';
import removeIcon from '../Assets/lixo.png';

export default function CadastroExercicio({ submitUrl }) {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        musculo: '',
        series: '',
        repeticoes: '',
        materiais: [] // Alterado para array de materiais
    });
    const [materiaisDisponiveis, setMateriais] = useState([
        {id:'1', nome:"Haltere"},
        {id:'2', nome:"Barra"},
        {id:'3', nome:"Anilha"},
        {id:'4', nome:"Corda"}
    ]);
    const [materialSelecionado, setMaterialSelecionado] = useState('');

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleMaterialChange = (e) => {
        setMaterialSelecionado(e.target.value);
    };

    const adicionarMaterial = () => {
        if (materialSelecionado && !formData.materiais.includes(materialSelecionado)) {
            setFormData(prevData => ({
                ...prevData,
                materiais: [...prevData.materiais, materialSelecionado]
            }));
            setMaterialSelecionado(''); // Limpa a seleção após adicionar
        }
    };

    const removerMaterial = (materialId) => {
        setFormData(prevData => ({
            ...prevData,
            materiais: prevData.materiais.filter(id => id !== materialId)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        /*axios.post(submitUrl, formData)
            .then((response) => {
                setFeedback({ message: 'Exercício cadastrado com sucesso!', type: 'success' });
            })
            .catch((error) => {
                setFeedback({ message: 'Erro ao cadastrar exercício!', type: 'error' });
            });*/
    };

    return (
        <>
            <TopBar Titulo={"Sistema Academia"} Username={username} />
            <div className="home-page">
                <MenuBar />

                <form className="generic-form" onSubmit={handleSubmit}>
                    {/* Nome do Exercício */}
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Músculo Trabalhado */}
                    <div className="form-group">
                        <label htmlFor="musculo">Músculo</label>
                        <input
                            type="text"
                            id="musculo"
                            name="musculo"
                            value={formData.musculo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Séries */}
                    <div className="form-group">
                        <label htmlFor="series">Séries</label>
                        <input
                            type="text"
                            id="series"
                            name="series"
                            value={formData.series}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Repetições */}
                    <div className="form-group">
                        <label htmlFor="repeticoes">Repetições</label>
                        <input
                            type="text"
                            id="repeticoes"
                            name="repeticoes"
                            value={formData.repeticoes}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Seleção de Materiais */}
                    <div className="aula-selection">
                        <label htmlFor="material">Selecione um Material</label>
                        <select
                            id="material"
                            name="material"
                            value={materialSelecionado}
                            onChange={handleMaterialChange}
                        >
                            <option value="">Selecione...</option>
                            {materiaisDisponiveis.map((material) => (
                                <option key={material.id} value={material.id}>
                                    {material.nome}
                                </option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            onClick={adicionarMaterial} 
                            className="icon-button add-btn"
                        >
                            <img src={addIcon} alt="Adicionar Material" className="icon" />
                        </button>
                    </div>

                    {/* Lista de Materiais Selecionados */}
                    <div>
                        <h3>Materiais Selecionados:</h3>
                        <ul>
                            {formData.materiais.map((materialId, index) => {
                                const material = materiaisDisponiveis.find(m => m.id === materialId);
                                return (
                                    <li key={index} className="selected-aula">
                                        <div className="aula">
                                            <span>{material ? material.nome : materialId}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => removerMaterial(materialId)} 
                                                className="icon-button remove-btn"
                                            >
                                                <img src={removeIcon} alt="Remover Material" className="icon" />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <button type="submit">Cadastrar</button>
                </form>

                <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
            </div>
        </>
    );
}