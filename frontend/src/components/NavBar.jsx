import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


export default function NavBar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLeave = (e)=>{
        e.preventDefault();
        logout();
        navigate('/login');
    }
    return(
        <div className="navbar__container">
            <h1 className="navbar__title">✂️ Summify</h1>
            <div className="navbar__account">
                <p className="navbar__email">{user.email}</p>
                <button className="navbar__button" onClick={handleLeave}>
                    Deconnexion
                </button>
            </div>
        </div>
    );
}