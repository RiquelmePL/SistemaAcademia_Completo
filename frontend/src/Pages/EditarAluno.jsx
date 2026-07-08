import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import '../Assets/HomePage.css';
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import "../Assets/Forms.css";
import addIcon from '../Assets/add-64px.png';
import removeIcon from '../Assets/lixo.png';

export default function EditarAluno({ submitUrl }) {
    const { id } = useParams()
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        matricula: '',
        nome: '',
        data_nascimento: '',
        cpf: '',
        email: '',
        telefone: '',
        logradouro: '',
        cep: '',
        rua: '',
        num_casa: '',
        bairro: '',
        cidade: '',
        plano_id: ''
    });
    const [planos, setPlanos] = useState([]);
    const [todasAulas, setTodasAulas] = useState([]); // Todas as aulas disponíveis
    const [aulasSelecionadas, setAulasSelecionadas] = useState([]); // Aulas do aluno
    const [aulaSelecionada, setAulaSelecionada] = useState('');
    const [todosTreinos, setTodosTreinos] = useState([]); // Todos os treinos disponíveis
    const [treinosSelecionados, setTreinosSelecionados] = useState([]); // Treinos do aluno
    const [treinoSelecionado, setTreinoSelecionado] = useState('');

    const aluno = {
        "matricula": "123456",
        "nome": "João Silva",
        "data_nascimento": "1995-08-20",
        "cpf": "123.456.789-00",
        "email": "joao.silva@email.com",
        "telefone": "(11) 98765-4321",
        "logradouro": "Avenida Paulista",
        "cep": "01310-000",
        "rua": "Paulista",
        "num_casa": "100",
        "bairro": "Bela Vista",
        "cidade": "São Paulo",
        "aulas": [
            { "id": "1", "nome": "teinoAula1" },
            { "id": "2", "nome": "teinoaula21" }
        ],
        "treinos": [
            { "id": "1", "nome": "teino1" },
            { "id": "2", "nome": "teino1" }
        ],
        "plano_id": "1"
    }

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
    };

    useEffect(() => {
        // Simulação de carregamento dos dados do aluno
        setFormData(aluno);
        setTodasAulas([{ id: "1", nome: "Based" }, { id: "2", nome: "Premiueeeeeem" }]);
        setAulasSelecionadas(aluno.aulas);
        setTodosTreinos([{ id: "1", nome: "Baseeee" }, { id: "2", nome: "Preffffffffmium" }]);
        setTreinosSelecionados(aluno.treinos);
        setPlanos([{ id: "1", nome: "Baseeee" }, { id: "2", nome: "Premppppium" }]);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Aulas functions
    const handleAulaChange = (e) => {
        setAulaSelecionada(e.target.value);
    };

    const adicionarAula = () => {
        if (aulaSelecionada && !aulasSelecionadas.some(aula => aula.id === aulaSelecionada)) {
            const aulaToAdd = todasAulas.find(aula => aula.id === aulaSelecionada);
            if (aulaToAdd) {
                setAulasSelecionadas([...aulasSelecionadas, aulaToAdd]);
            }
        }
    };

    const removerAula = (aulaId) => {
        setAulasSelecionadas(aulasSelecionadas.filter(aula => aula.id !== aulaId));
    };

    // Treinos functions
    const handleTreinoChange = (e) => {
        setTreinoSelecionado(e.target.value);
    };

    const adicionarTreino = () => {
        if (treinoSelecionado && !treinosSelecionados.some(treino => treino.id === treinoSelecionado)) {
            const treinoToAdd = todosTreinos.find(treino => treino.id === treinoSelecionado);
            if (treinoToAdd) {
                setTreinosSelecionados([...treinosSelecionados, treinoToAdd]);
            }
        }
    };

    const removerTreino = (treinoId) => {
        setTreinosSelecionados(treinosSelecionados.filter(treino => treino.id !== treinoId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            aulas: aulasSelecionadas.map(aula => aula.id),
            treinos: treinosSelecionados.map(treino => treino.id),
        };

        /*axios.post(submitUrl, dataToSubmit)
            .then((response) => {
                setFeedback({ message: 'Cadastro realizado com sucesso!', type: 'success' });
            })
            .catch((error) => {
                setFeedback({ message: 'Erro ao cadastrar aluno!', type: 'error' });
            });*/

        console.log(dataToSubmit)
    };

    return (
        <>
            <TopBar Titulo={"Sistema Academia"} Username={username} />
            <div className="home-page">
                <MenuBar />

                <form className="generic-form" onSubmit={handleSubmit}>
                    {/* Matrícula */}
                    <div className="form-group">
                        <label htmlFor="matricula">Matrícula</label>
                        <input
                            type="text"
                            id="matricula"
                            name="matricula"
                            value={formData.matricula}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Nome */}
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

                    {/* Data de Nascimento */}
                    <div className="form-group">
                        <label htmlFor="data_nascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="data_nascimento"
                            name="data_nascimento"
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* CPF */}
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Logradouro */}
                    <div className="form-group">
                        <label htmlFor="logradouro">Logradouro</label>
                        <input
                            type="text"
                            id="logradouro"
                            name="logradouro"
                            value={formData.logradouro}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* CEP */}
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Rua */}
                    <div className="form-group">
                        <label htmlFor="rua">Rua</label>
                        <input
                            type="text"
                            id="rua"
                            name="rua"
                            value={formData.rua}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Número da Casa */}
                    <div className="form-group">
                        <label htmlFor="num_casa">Número da Casa</label>
                        <input
                            type="text"
                            id="num_casa"
                            name="num_casa"
                            value={formData.num_casa}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Bairro */}
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input
                            type="text"
                            id="bairro"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Cidade */}
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Aula Selection */}
                    <div className="aula-selection">
                        <label htmlFor="aula">Selecione uma Aula</label>
                        <select
                            id="aula"
                            name="aula"
                            value={aulaSelecionada}
                            onChange={handleAulaChange}
                        >
                            <option value="">Selecione...</option>
                            {todasAulas.map((aula) => (
                                <option key={aula.id} value={aula.id}>{aula.nome}</option>
                            ))}
                        </select>
                        <button type="button" onClick={adicionarAula} className="icon-button add-btn">
                            <img src={addIcon} alt="Adicionar Aula" className="icon" />
                        </button>
                    </div>

                    {/* List of selected aulas */}
                    <div>
                        <h3>Aulas Selecionadas:</h3>
                        <ul>
                            {aulasSelecionadas.map((aula) => (
                                <li key={aula.id} className="selected-aula">
                                    <div className="aula"><span>{aula.nome}</span>
                                        <button type="button" onClick={() => removerAula(aula.id)} className="icon-button remove-btn">
                                            <img src={removeIcon} alt="Remover Aula" className="icon" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Treino Selection */}
                    <div className="aula-selection">
                        <label htmlFor="treino">Selecione um Treino</label>
                        <select
                            id="treino"
                            name="treino"
                            value={treinoSelecionado}
                            onChange={handleTreinoChange}
                        >
                            <option value="">Selecione...</option>
                            {todosTreinos.map((treino) => (
                                <option key={treino.id} value={treino.id}>{treino.nome}</option>
                            ))}
                        </select>
                        <button type="button" onClick={adicionarTreino} className="icon-button add-btn">
                            <img src={addIcon} alt="Adicionar Treino" className="icon" />
                        </button>
                    </div>

                    {/* List of selected treinos */}
                    <div>
                        <h3>Treinos Selecionados:</h3>
                        <ul>
                            {treinosSelecionados.map((treino) => (
                                <li key={treino.id} className="selected-aula">
                                    <div className="aula"><span>{treino.nome}</span>
                                        <button type="button" onClick={() => removerTreino(treino.id)} className="icon-button remove-btn">
                                            <img src={removeIcon} alt="Remover Treino" className="icon" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Plano Selection */}
                    <div className="form-group">
                        <label htmlFor="plano_id">Plano</label>
                        <select
                            id="plano_id"
                            name="plano_id"
                            value={formData.plano_id}
                            onChange={handleChange}
                            required
                        >
                            {planos.length > 0 ? (
                                planos.map((plano) => (
                                    <option key={plano.id} value={plano.id}>
                                        {plano.nome}
                                    </option>
                                ))
                            ) : (
                                <option value="">Carregando...</option>
                            )}
                        </select>
                    </div>

                    <button type="submit">Editar</button>
                </form>

                <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
            </div>
        </>
    );
}