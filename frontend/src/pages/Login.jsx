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
        <div className="login__container">
            <form onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Login</h2>
                {error && <p className="login__error">{error}</p>}
                <div className="login__inputs">
                    <input
                        type="email"
                        placeholder="Email..."
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="form__input"/>
                    <input
                        type="password"
                        placeholder="Mot de passe..."
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="form__input"/>
                </div>

                <div className="login__footer">
                    <button type="submit" className="form__button">
                        Se connecter
                    </button>
                    <p className="login__link">Pas de compte? <span className="link__span" onClick={()=>navigate("/register")}>Créer un compte</span></p>
                </div>

            </form>
        </div>
    )
}
