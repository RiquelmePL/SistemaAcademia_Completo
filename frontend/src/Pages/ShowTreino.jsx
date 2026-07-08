import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate ,useParams } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import ProfilePage from "../Components/ProfilePage";



export default function ShowTreino({viewUrl}){
    const {id} = useParams()
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };

      const TreinoData = {
        Treino: {
          ID_Treino: 1,
          Objetivo: "Hipertrofia",
          Dificuldade: "Avançado"
        },
        Exercicios: [
          {
            ID_Exercicio: 101,
            Nome: "Supino Reto",
            Musculo: "Peitoral",
            Series: 4,
            Repeticoes: 10
          },
          {
            ID_Exercicio: 102,
            Nome: "Agachamento Livre",
            Musculo: "Pernas",
            Series: 4,
            Repeticoes: 12
          },
          {
            ID_Exercicio: 103,
            Nome: "Puxada Alta",
            Musculo: "Costas",
            Series: 3,
            Repeticoes: 12
          },
          {
            ID_Exercicio: 104,
            Nome: "Rosca Direta",
            Musculo: "Bíceps",
            Series: 3,
            Repeticoes: 15
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
            <ProfilePage ProfileData={TreinoData}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}