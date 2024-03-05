import React from "react";

function Popup(){
    return(
        <div className="cmt_pop">
            <div className="cmt_square">
                <span className="cmt_exit" onClick={()=>{console.log("Teste")}}>X</span>
                <div className="cmt_title">Add a comment!</div>
                <textarea className="cmt_text" placeholder="Write here yout message" maxLength={150}></textarea>
                <button className="cmt_btn">Send!</button>
            </div>
        </div>
    )
}

export {
    Popup
};