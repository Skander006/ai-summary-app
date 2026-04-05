import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import NavBar from "../components/NavBar.jsx";
import UserInput from "../components/UserInput.jsx";
import api from "../api/axios.js";
import Result from "../components/Result.jsx";


export default function Summary(){
    const {user} = useAuth();
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async(e)=>{
        e.preventDefault();
        if(!text.trim()){
            setError("Veuillez ajouter du texte pour pouvoir le résumer");
            return;
        }
        setError("");
        setLoading(true);
        try{
            const res = await api.post('/summary', {text});
            const result = res.data.summary.split(":")[1];
            setResult(result);
        } catch(err){
            console.error(err.message);
            setError(err?.response?.data?.error || err.message);
        } finally {
            setLoading(false);
            setText("");
        }
    }

    const time = new Date().getHours();
    let greeting;
    if(time <= 12){
        greeting = "Bonjour";
    } else if(time > 12 && time < 18){
        greeting = "Bon après-midi";
    } else{
        greeting = "Bonsoir";
    }
    return(
        <div className="summary__container">
            <NavBar />
            <h2>{greeting}, {user.firstname}</h2>
            {error && <p>{error}</p>}
            <div className="summary__message">
                <UserInput message={text} setMessage={setText}/>
                <button onClick={handleSend} className="summary__button">Résumer</button>
            </div>
            <div className="summary__result">
                <Result response={result} />
            </div>
        </div>
    );
}