import React, { useState, useEffect, createContext, useContext } from "react";
import {refreshToken, getTokenId, refreshCookieValue } from "../scripts/getUser";
import { getUser } from "../services/userFetch";

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    async function getUserData(){
        const userSelected = getTokenId(refreshToken());
        let data = await getUser(userSelected);
        if (data.isValid && "newAccessToken" in data.isValid) {
            refreshCookieValue("accessToken",data.isValid.newAccessToken);
            data = await getUser(userSelected);
        }
        setUser(data.user)
    }

    async function tryGetUser(){
        try {
            await getUserData();
        } catch(error){
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async ()=>{
        setLoading(true);
        await tryGetUser();
    };

    useEffect(() => {
        (async () => {
            await tryGetUser();
        })();
    },[]);

    return (
        <UserContext.Provider value={{ user, loading, error, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};