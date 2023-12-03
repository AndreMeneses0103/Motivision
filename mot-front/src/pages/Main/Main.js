// import { useState } from "react";
import "./Main.css";
import Head from "../../components/Head";
import Videos from "./All_Videos";
import accessToken from "../../scripts/getUser";
import { useEffect } from "react";
// import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";

function Main() {

    useEffect(()=>{
        const token = accessToken();
        console.log("TOKEN:", token);
    })
    return (
        <div className="div_main">
            <Head />
            <div className="Align_Videos">
                <div className="src_container">
                    <input
                        type="text"
                        className="search_input"
                        id="search_input"
                        placeholder="Search..."
                    ></input>
                    <button
                        className="btn_search"
                        id="btn_search"
                        type="button"
                    >
                        <img src="./icons/search.png" alt="Search Icon" id="icon_search"></img>
                    </button>
                </div>
                <div className="All_Videos">
                    <Videos/>
                </div>
            </div>
        </div>
    );
}

export default Main;
