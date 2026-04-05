import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import NavBar from "../components/NavBar.jsx";


export default function Summary(){
    const {user} = useAuth();
    const [text, setText] = useState("");

    const handleSend = (e)=>{
        e.preventDefault();
    }

    return(
        <div className="summary__container">
            <NavBar />
            <h2>Hello, {user.firstname}</h2>

        </div>
    )
}