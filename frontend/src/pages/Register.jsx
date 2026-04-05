import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import api from "../api/axios.js";

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {user, login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!email.trim() || !password.trim()){
            return;
        }
        try{
            const res = await api.post('/register', {email, password});
            login(res.data.token, res.data.user);
            navigate('/');
        } catch(err){
            console.error(err.message);
            setError(err?.response?.data?.message || err.message);
        }
    }

    return(
        <div className="register__container">
            <form onSubmit={handleSubmit} className="register">
                <h2>Créer un compte</h2>
                {error && <p className="register__error">{error}</p> }
                <input
                    type="email"
                    value={email}
                    placeholder="Email..."
                    onChange={(e)=>setEmail(e.target.value)}
                    className="register__input"
                    />
                <input
                    type="password"
                    placeholder="Mot de passe..."
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="register__input"
                    />
                <button type="submit" className="register__button">
                    Créer un Compte
                </button>
                <p className="register__link">Déjà un compte? <span className="span__link">Se connecter</span></p>
            </form>
        </div>
    );
}