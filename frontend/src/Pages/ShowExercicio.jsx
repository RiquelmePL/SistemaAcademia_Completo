import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate ,useParams } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";
import ProfilePage from "../Components/ProfilePage";



export default function ShowExercicio({viewUrl}){
    const {id} = useParams()
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')

    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };
      const ExercicioData = {
        Exercicio: {
            ID_Exercicio: 101,
            Nome: "Supino Reto",
            Musculo: "Peitoral",
            Series: 4,
            Repeticoes: 10
        },
        Aparelhos: [
            {
                ID_Aparelho: 201,
                Nome: "Banco Reto",
                Quantidade: 5,
                Disponibilidade: "Disponível"
            },
            {
                ID_Aparelho: 202,
                Nome: "Halteres",
                Quantidade: 10,
                Disponibilidade: "Disponível"
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
            <ProfilePage ProfileData={ExercicioData}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}