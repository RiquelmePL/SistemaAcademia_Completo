import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate ,useParams } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import ProfilePage from "../Components/ProfilePage";



export default function ShowFuncionario({viewUrl}){
    const {id} = useParams()
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };

      const FuncionarioData = {
        Funcionario: {
          NIT: 123456,
          Nome: "Carlos Silva",
          DataNascimento: "1985-07-12",
          CPF: "123.456.789-00",
          Email: "carlos.silva@email.com",
          Telefone: "(11) 98765-4321"
        },
        Endereço: {
          Logradouro: "Av. Central",
          CEP: "01000-000",
          Rua: "Rua das Palmeiras",
          NumCasa: 123,
          Bairro: "Centro",
          Cidade: "São Paulo"
        },
        Administrador: {
          Cargo: "Gerente"
        },
        Instrutor: {
          GrauAcademico: "Bacharel em Educação Física"
        },
        Contrato: {
          ID_Contrato: 7890,
          Salario: "R$ 5.000,00",
          DataContratacao: "2020-05-10",
          DataFinal: null
        },
        Usuario: {
          ID_Usuario: 5678,
          Username: "carlos.silva",
          IsAdmin: true
        },
        Aulas: [
          {
            ID_Aula: 1,
            Horario: "Segunda-feira - 08h",
            Tipo: "Spinning",
            Sala: "Sala 1"
          },
          {
            ID_Aula: 2,
            Horario: "Quarta-feira - 10h",
            Tipo: "Musculação",
            Sala: "Sala 3"
          }
        ],
        AvaliacoesFisicas: [
          {
            ID_Avaliacao: 101,
            Altura: "1.75m",
            Peso: "80kg",
            Observacoes: "Bom condicionamento físico",
            Biotipo: "Atlético",
            Medidas: "Braço: 35cm, Peito: 100cm"
          }
        ]
      };
      
      
      /*
    useEffect(() => {
        axios.get('http://localhost:5000/session', { withCredentials: true })
            .then(response => {
                if (response.data.permission === 'OK') {
                    setUsername(response.data.user);
                    setIsAdmin(response.data.isAdm);
                } else {
                    navigate('/');
                }
            })
            .catch(() => navigate('/'));
    }, [navigate]);

    useEffect(() => {
        axios.get('http://localhost:5000/ListarAluno', { withCredentials: true })
            .then(response => {
                if (response.data.alunos) {
                    setAlunos(response.data.alunos);
                }
            })
            .catch(() => {
                // Tratar erro (se necessário)
            });
    }, []);  // Lista de dependências vazia, a requisição será feita apenas uma vez
    */
    return (
        <>
        <TopBar Titulo={"Sistema Academia"} Username={username} IsAdmin={IsAdmin}/>
        <div class="home-page">
            <MenuBar />
            <ProfilePage ProfileData={FuncionarioData}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}