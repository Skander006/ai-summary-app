import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import api from "../api/axios.js";

export default function Register(){
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {user, login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!email.trim() || !password.trim() || !firstname.trim() || !lastname.trim()){
            return;
        }
        try{
            const res = await api.post('/auth/register', {firstname, lastname, email, password});
            login(res.data.token, res.data.user);
            navigate('/');
        } catch(err){
            console.error(err.message);
            setError(err?.response?.data?.error || err.message);
        } finally {
            setEmail('');
            setPassword('');
            setFirstname('');
            setLastname('');
        }
    }

    return(
        <div className="register__container">
            <h1 className="register__welcome">Welcome to Summify !</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <h2 className="register__title">Créer un compte</h2>
                {error && <p className="register__error">{error}</p> }
                <div className="register__inputs">
                    <input
                        type="text"
                        placeholder="Prénom..."
                        value={firstname}
                        onChange={(e)=>setFirstname(e.target.value)}
                        className="register__input"
                    />
                    <input
                        type="text"
                        placeholder="Nom..."
                        value={lastname}
                        onChange={(e)=>setLastname(e.target.value)}
                        className="register__input"
                    />
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
                </div>

                <button type="submit" className="register__button">
                    Créer un Compte
                </button>
                <p className="register__link">Déjà un compte? <span className="span__link" onClick={()=>navigate("/login")}>Se connecter</span></p>
            </form>
        </div>
    );
}