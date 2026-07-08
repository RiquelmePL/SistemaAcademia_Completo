import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate , useParams} from "react-router-dom";
import '../Assets/HomePage.css';
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import "../Assets/Forms.css";
import addIcon from '../Assets/add-64px.png';
import removeIcon from '../Assets/lixo.png';

export default function EditarTreino({ submitUrl }) {
    const {id} = useParams()
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        objetivo: '',
        dificuldade: '',
        exercicios: [], // Alterado para array
        aluno_id: ''
    });
    const [exerciciosDisponiveis, setExerciciosDisponiveis] = useState([{id:'1',nome:"Supino"},{id:'2',nome:"Agachamento"}]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState('');
    const [alunos, setAlunos] = useState([{id:'1',nome:"Aluno 1"},{id:'2',nome:"Aluno 2"}]);

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleExercicioChange = (e) => {
        setExercicioSelecionado(e.target.value);
    };

    const adicionarExercicio = () => {
        if (exercicioSelecionado && !formData.exercicios.includes(exercicioSelecionado)) {
            setFormData(prevData => ({
                ...prevData,
                exercicios: [...prevData.exercicios, exercicioSelecionado]
            }));
            setExercicioSelecionado(''); // Limpa a seleção após adicionar
        }
    };

    const removerExercicio = (exercicio) => {
        setFormData(prevData => ({
            ...prevData,
            exercicios: prevData.exercicios.filter((item) => item !== exercicio)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        /*axios.post(submitUrl, formData)
            .then((response) => {
                setFeedback({ message: 'Treino cadastrado com sucesso!', type: 'success' });
            })
            .catch((error) => {
                setFeedback({ message: 'Erro ao cadastrar treino!', type: 'error' });
            });*/
    };

    return (
        <>
            <TopBar Titulo={"Sistema Academia"} Username={username} />
            <div className="home-page">
                <MenuBar />

                <form className="generic-form" onSubmit={handleSubmit}>
                    {/* Objetivo */}
                    <div className="form-group">
                        <label htmlFor="objetivo">Objetivo</label>
                        <input
                            type="text"
                            id="objetivo"
                            name="objetivo"
                            value={formData.objetivo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Dificuldade */}
                    <div className="form-group">
                        <label htmlFor="dificuldade">Dificuldade</label>
                        <input
                            type="text"
                            id="dificuldade"
                            name="dificuldade"
                            value={formData.dificuldade}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Seleção de Exercícios */}
                    <div className="aula-selection">
                        <label htmlFor="exercicio">Selecione um Exercício</label>
                        <select
                            id="exercicio"
                            name="exercicio"
                            value={exercicioSelecionado}
                            onChange={handleExercicioChange}
                        >
                            <option value="">Selecione...</option>
                            {exerciciosDisponiveis.map((exercicio) => (
                                <option key={exercicio.id} value={exercicio.id}>
                                    {exercicio.nome}
                                </option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            onClick={adicionarExercicio} 
                            className="icon-button add-btn"
                        >
                            <img src={addIcon} alt="Adicionar Exercício" className="icon" />
                        </button>
                    </div>

                    {/* Lista de Exercícios Selecionados */}
                    <div>
                        <h3>Exercícios Selecionados:</h3>
                        <ul>
                            {formData.exercicios.map((exercicioId, index) => {
                                const exercicio = exerciciosDisponiveis.find(e => e.id === exercicioId);
                                return (
                                    <li key={index} className="selected-aula">
                                        <div className="aula">
                                            <span>{exercicio ? exercicio.nome : exercicioId}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => removerExercicio(exercicioId)} 
                                                className="icon-button remove-btn"
                                            >
                                                <img src={removeIcon} alt="Remover Exercício" className="icon" />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <button type="submit">Editar</button>
                </form>

                <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
            </div>
        </>
    );
}