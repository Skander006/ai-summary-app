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
    const [style, setStyle] = useState("short");

    const handleSelect = (e)=>{
        e.preventDefault();
        setStyle(e.target.value);
    }

    const handleSend = async(e)=>{
        e.preventDefault();
        if(!text.trim()){
            setError("Veuillez ajouter du texte pour pouvoir le résumer");
            return;
        }
        setError("");
        setLoading(true);
        try{
            let res;
            if(style === "short"){
                res = await api.post('/summary/short', {text});
            } else if(style === "detailed"){
                res = await api.post('/summary/detailed', {text});
            } else if(style === "bullet"){
                res = await api.post('/summary/bullet', {text});
            } else{
                setError("Erreur de style");
                console.error("Erreur de style");
                return;
            }
            const summaryText = res.data.summary;
            const result = summaryText.includes(":")? summaryText.split(":")[1] : summaryText;
            setResult(result);
            setText("");
        } catch(err){
            console.error(err.message);
            setError(err?.response?.data?.error || err.message);
        } finally {
            setLoading(false);
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
            <div className="summary__content">
                <div className="summary__header">
                    <h2 className="summary__title">{greeting}, {user.firstname}</h2>
                    <select onChange={handleSelect} className="summary__select">
                        <option value="short">Résumé court</option>
                        <option value="detailed">Résumé détaillé</option>
                        <option value="bullet">Résumé en puces</option>
                    </select>
                </div>

                {error && <p className="summary__error">{error}</p>}
                <div className="summary__message">
                    <UserInput message={text} setMessage={setText}/>
                    <div className="summary__button__container">
                        <button onClick={handleSend} disabled={loading || !text.trim()} className="summary__button">Résumer</button>
                    </div>
                </div>

                {loading && <div className="flex justify-center items-center">
                    <div className="summary__loading"></div>
                </div>}
                {result && <div className="summary__result">
                    <h3 className="summary__result__title">Votre résumé : </h3>
                    <Result response={result} />
                </div>}

            </div>

        </div>
    );
}