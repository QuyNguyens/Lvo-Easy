// auth-success.jsx
import { useEffect } from "react";
import { UserProfile } from "../types/user";
import authApi from "../api/authApi";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {

    const {setUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const type = urlParams.get('type');
            if(token){
                localStorage.setItem('access_token', token);
                try {
                    const res = await authApi.loginToken(type || "");
                    const userData : UserProfile = {
                        email: res.email,
                        _id: res.userId,
                        avatar: res.avatar,
                        name: res?.name
                    }
                    setUser(userData);
                    navigate('/');
                } catch (error) {
                    console.error('verify failed: ', error);
                }
            }
        }
        verifyToken();
    }, []);

    return (
        <p className="text-3xl mt-10 font-medium text-center">Loading user info...</p>
    );
};

export default AuthSuccess;
