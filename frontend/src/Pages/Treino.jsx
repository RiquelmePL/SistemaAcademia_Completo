import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TableComponent from "../Components/TableContent";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";


export default function Treinos({AddPath, urlView , urlEdit , deleteUrl}){
    const navigate = useNavigate();
    const titulo = "Tabela de Treinos";
    const headers = ["Objetivo", "Dificuldade"];
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin,setIsAdmin] = useState('')
    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };
      
      const dados = [
        { id:"1",objetivo: "Emagrecimento", dificuldade: "Média" },
        { id:"2" ,objetivo: "Aumento de massa muscular", dificuldade: "Alta" },
        { id:"3",objetivo: "Melhora da resistência", dificuldade: "Baixa" }
      ];
    
    
    /*useEffect(() => {
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
    }, [navigate]);*/

    /*
    useEffect(() => {
        axios.get('http://localhost:5000/ListarPlano', { withCredentials: true })
            .then(response => {
                if (response.data.planos) {
                    setPlanos(response.data.planos)
                    console.log(response.data.planos)
                } else {
                    setPlanos([])
                }
            })
            .catch(() => {
                setPlanos([])
            });
    }, []);  // Lista de dependências vazia, a requisição será feita apenas uma vez
    */
    return (
        <>
        <TopBar Titulo={"Sistema Academia"} Username={username} IsAdmin={IsAdmin}/>
        <div class="home-page">
            <MenuBar />
            <TableComponent titulo={titulo} dados={dados} headers={headers} AddPath={AddPath} urlEdit={"/treino/edit"} urlView={"/treino/view"} keyUnique={"id"} />
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}