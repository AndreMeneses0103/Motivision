// import { useState } from "react";
import "../../styles/Main.css";
import Videos from "./All_Videos";
// import {accessToken, refreshToken} from "../../scripts/getUser";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Main() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    let { user, loading, error, logout, updateUser } = useUser();

    useEffect(() => {
        //continuar search de videos
    },[search]);

    // useEffect(()=>{
    //     if(user){
    //         console.log(`USER: ${user}`);
    //     }else{
    //         console.log("sem user")
    //     }
    // },[user])
    return (
        <div className="div_main">
            <div className="Align_Videos">
                <div className="filter_container">
                <button
                    type="button"
                    id="all_vids"
                    className="filter_btn"
                    onClick={(e) => {
                        document.querySelectorAll('.filter_btn').forEach(btn => btn.classList.remove('selected'));
                        e.currentTarget.classList.add('selected');
                        setFilter("all");
                    }}                   
                >
                All
                </button>
                    <button
                        type="button"
                        id="subs_vids"
                        className="filter_btn"
                        onClick={(e) => {
                            document.querySelectorAll('.filter_btn').forEach(btn => btn.classList.remove('selected'));
                            e.currentTarget.classList.add('selected');
                            setFilter("subscribed");
                        }}
                    >
                    Only Subscribed
                    </button>
                    <input
                        type="text"
                        className="search_input"
                        id="search_input"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <button
                        className="btn_search"
                        id="btn_search"
                        type="button"
                    >
                        <img
                            src="./icons/search.png"
                            alt="Search Icon"
                            id="icon_search"
                        ></img>
                    </button>
                </div>
                <div className="All_Videos">
                    {loading ? (
                        <img
                            id="userphoto"
                            itemID="userphoto"
                            src="../icons/loading.gif"
                            alt="User Profile"
                        />
                    ):(
                        <Videos filter={filter} search={search} channel={user.subscribed}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;
