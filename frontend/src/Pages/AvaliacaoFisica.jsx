import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Assets/HomePage.css'
import MenuBar from "../Components/MenuBar";
import TableComponent from "../Components/TableContent";
import TopBar from "../Components/TopBar";
import FeedbackPopup from "../Components/FeedbackPopup";


export default function Avaliacao({AddPath, urlView , urlEdit}){
    const navigate = useNavigate();
    const titulo = "Tabela de Avaliação Física";
    const headers = ["Altura", "Peso", "Biotipo"];
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [username, setUsername] = useState('');
    const [avFisicas, setAvFisicas] = useState('');
    const closeFeedback = () => {
        setFeedback({ message: '', type: '' });
      };

    
    
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
        axios.get('http://localhost:5000/ListarAvaliacaoFisica', { withCredentials: true })
            .then(response => {
                if (response.data["avaliacoes fisicas"]) {
                    setAvFisicas(response.data["avaliacoes fisicas"])
                    
                } else {

                }
            })
            .catch();
    }, [navigate]);
    
    

    return (
        <>
        <TopBar Titulo={"Sistema Academia"} Username={username}/>
        <div class="home-page">
            <MenuBar />
            <TableComponent titulo={titulo} dados={avFisicas} headers={headers} AddPath={AddPath} urlEdit={urlEdit} urlView={urlView} deleteUrl={"http://localhost:5000/RemoverAvaliacaoFisica"} keyUnique={"id_avaliacao_fisica"}/>
            <FeedbackPopup message={feedback.message} type={feedback.type} onClose={closeFeedback} />
        </div>
        </>
    );
}