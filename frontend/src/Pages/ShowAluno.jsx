import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate ,useParams } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import ProfilePage from "../Components/ProfilePage";



export default function ShowAluno({viewUrl}){
    const {id} = useParams()
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };

      const ProfileData = {
        Aluno: {
          Nome: "João Vitor",
          Departamento: "TI",
          Acesso: "Total"
        },
        Endereço: {
          Rua: "Av. Paulista",
          Cidade: "São Paulo",
          CEP: "01310-000"
        },
        Treinos: [
          {
            Nome: "Treino A",
            Tipo: "Hipertrofia",
          },
          {
            Nome: "Treino B",
            Tipo: "Resistência"
          }
        ],
        Aulas: [
          {
            Nome: "Yoga",
            Instrutor: "Ana Souza",
            Horário: "Segunda-feira - 18h"
          },
          {
            Nome: "Spinning",
            Instrutor: "Carlos Lima",
            Horário: "Quarta-feira - 19h"
          }
        ],
        Planos: [
          {
            Nome: "Mensal",
            Preço: "R$ 99,90",
            Benefícios: ["Acesso Total", "Aulas Inclusas", "Personal Trainer"]
          },
          {
            Nome: "Anual",
            Preço: "R$ 999,90",
            Benefícios: ["Acesso Total", "Desconto de 20%", "Acompanhamento Nutricional"]
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
            <ProfilePage ProfileData={ProfileData}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}