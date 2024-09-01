import React, { useState, useEffect, createContext, useContext } from "react";
import { refreshToken, getTokenId, refreshCookieValue, removeTokens } from "../scripts/getUser";
import { getUser } from "../services/userFetch";
import { InvalidTokenError } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const handleError = (error) => {
        if (error instanceof InvalidTokenError) {
            console.warn('Invalid Token, please login again.');
        } else {
            console.error(error);
        }
        setError(error);
    };

    const getUserData = async () => {
        const tokenId = getTokenId(refreshToken());
        try {
            let data = await getUser(tokenId);
            if (data.isValid?.newAccessToken) {
                refreshCookieValue("accessToken", data.isValid.newAccessToken);
                data = await getUser(tokenId);
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
    };

    const tryGetUser = async () => {
        setLoading(true);
        return await getUserData();
    };

    const updateUser = async () => {
        setLoading(true);
        return await tryGetUser();
    };

    const logout = () => {
        setUser(null);
        removeTokens('accessToken');
        removeTokens('refreshToken');
    };

    useEffect(() => {
        (async () => {
            try {
                await tryGetUser();
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};
