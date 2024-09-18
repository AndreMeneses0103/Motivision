import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { refreshToken, getTokenId, refreshCookieValue, removeTokens } from "../scripts/getUser";
import { getUser } from "../services/userFetch";
import { InvalidTokenError } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [tokenId, setTokenId] = useState(null);

    const handleError = useCallback((error) => {
        if (error instanceof InvalidTokenError) {
            console.warn('Invalid Token, please login again.');
        } else {
            console.error(error);
        }
        setError(error);
    }, []);

    const getUserData = useCallback(
        async () => {
            try {
                const currentTokenId = tokenId || getTokenId(refreshToken());
                setTokenId(currentTokenId);
                let data = await getUser(currentTokenId);
                if (data.isValid?.newAccessToken) {
                    refreshCookieValue("accessToken", data.isValid.newAccessToken);
                    data = await getUser(currentTokenId);
                }
                if (data.user) {
                    setUser(data.user);
                    return data.user;
                }
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        }, [tokenId, handleError]
    );

    const tryGetUser = useCallback(
    async () => {
        setLoading(true);
        return await getUserData();
        }, [getUserData]
    );

    const updateUser = useCallback(
        async () => {
            setLoading(true);
            return await tryGetUser();
        }, [tryGetUser]        
    ) 

    const logout = useCallback(
        () => {
            setUser(null);
            removeTokens('accessToken');
            removeTokens('refreshToken');
        }, []
    ); 

    useEffect(() => {
        (async () => {
            try {
                await tryGetUser();
            } catch (error) {
                handleError(error);
            }
        })();
    }, [tryGetUser, handleError]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                tryGetUser();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [tryGetUser]);

    return (
        <UserContext.Provider value={{ user, loading, error, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};
