import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accessToken, refreshCookieValue, refreshToken } from "../../scripts/getUser";

function LoginChecker() {
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = getToken();
        if (userToken) {
            navigate("/main");
        }else{
            navigate("/login");
        }
    }, [navigate]);

    function getToken() {
        const haveRefresh = refreshToken();
        // console.log("Refresh:", haveRefresh)
        if (haveRefresh !== null) {
            return true;
        } else {
            return null;
        }
    }

    return null;
}

export default LoginChecker;
