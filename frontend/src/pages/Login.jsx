import {useState} from "react";
import api from "../api/axios.js";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {user, login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!email.trim() || !password.trim()) {
            setError('Les champs sont requis !');
            return;
        }
        setError('');
        try{
            const res = await api.post('/auth/login',{email, password});
            login(res.data.token, res.data.user);
            navigate('/');
        } catch(err){
            console.error(err.message);
            setError(err?.response?.data?.error || err.message);
        }
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>
                {error && <p className="login-error">{error}</p>}
                <input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="form-input"/>
                <input
                    type="password"
                    placeholder="Mot de passe..."
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="form-input"/>
                <button type="submit" className="form-button">
                    Se connecter
                </button>
                <p className="login-link">Pas de compte? <span className="link-span">Créer un compte</span></p>
            </form>
        </div>
    )
}
