import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TableComponent from "../Components/TableContent";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";


export default function Visitante({AddPath , urlView , urlEdit, deleteUrl}){
    const navigate = useNavigate();
    const titulo = "Tabela de Visitantes";
    const headers = ["Nome", "qunt_visitas", "Data_visita", "Telefone"];
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [IsAdmin, setIsAdmin] = useState('');
    const [visitantes, setVisitantes] = useState('');
    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };

    const dados = [
        { aluno: 'Roberto da Silva Junior', contato: '9123912398', visitas: 3, ultima: '2025-03-15' },
        { aluno: 'Pedro Paulo Batista Santos', contato: '1823912389', visitas: 5, ultima: '2025-03-18' },
        { aluno: 'Maria Oliveira', contato: '9834567890', visitas: 2, ultima: '2025-03-10' },
        { aluno: 'Carlos Eduardo', contato: '9876543210', visitas: 4, ultima: '2025-03-12' },
        { aluno: 'Ana Carolina', contato: '9988776655', visitas: 1, ultima: '2025-03-20' },
        { aluno: 'Fernanda Lima', contato: '9123456789', visitas: 6, ultima: '2025-03-16' },
        { aluno: 'Ricardo Almeida', contato: '9876541230', visitas: 3, ultima: '2025-03-14' },
        { aluno: 'Juliana Costa', contato: '9988771234', visitas: 7, ultima: '2025-03-17' },
        { aluno: 'Lucas Mendes', contato: '9123451234', visitas: 2, ultima: '2025-03-19' },
    ];
    
    useEffect(() => {
        axios.get('http://localhost:5000/session', { withCredentials: true })
            .then(response => {
                if (response.data.permission === 'OK') {
                    setUsername(response.data.user);
                } else {
                    navigate('/');
                }
            })
            .catch(() => navigate('/'));
    }, [navigate]);


    useEffect(() => {
        axios.get('http://localhost:5000/ListarVisitantes', { withCredentials: true })
            .then(response => {
                if (response.data.visitantes) {
                    setVisitantes(response.data.visitantes)
   
                } else {

                }
            })
            .catch(() => {

            });
    }, []); 

    return (
        <>
        <TopBar Titulo={"Sistema Academia"} Username={username}/>
        <div class="home-page">
            <MenuBar />
            <TableComponent dados={visitantes} headers={headers} titulo={"Tabela de Visitantes"} AddPath={AddPath} urlView={"/visitante/view"} keyUnique={"id_visitantes"} urlEdit={"/visitante/edit"} deleteUrl={"http://localhost:5000/RemoverVisitante"}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}