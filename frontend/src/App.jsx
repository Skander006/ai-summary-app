import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import AuthProvider, {useAuth} from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Summary from "./pages/Summary.jsx";

function ProtectedRoute({children}){
    const {user} = useAuth();
    return user? children :  <Navigate to='/login' />
}

export default function App(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={
                       <ProtectedRoute>
                           <Summary />
                       </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

