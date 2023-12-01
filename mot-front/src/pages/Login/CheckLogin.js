import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginChecker() {
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = getToken();
        if (userToken) {
            navigate("/main");
        }else{
            navigate("/login")
        }
    }, [navigate]);

    function getToken() {
        const [key, token] = document.cookie.split("=");
        if (key === "authToken") {
            return token;
        } else {
            return null;
        }
    }

    return null;
}

export default LoginChecker;
