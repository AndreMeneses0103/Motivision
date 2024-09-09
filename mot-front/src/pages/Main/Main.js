// import { useState } from "react";
import "../../styles/Main.css";
import Head from "../../components/Head";
import Videos from "./All_Videos";
// import {accessToken, refreshToken} from "../../scripts/getUser";
import { useEffect, useState } from "react";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Main() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        console.log(search);
        //continuar search de videos
    },[search]);

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
                    <Videos filter={filter} search={search}/>
                </div>
            </div>
        </div>
    );
}

export default Main;
