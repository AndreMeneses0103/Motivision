import React, { useState } from "react";

function Popup({cmtControl, sendMessage, updateMessage}){

    const [text, setText] = useState(null);
    return(
        <div className="cmt_pop">
            <div className="cmt_square">
                <span className="cmt_exit" onClick={cmtControl}>X</span>
                <div className="cmt_title">Add a comment!</div>
                <textarea 
                    className="cmt_text" 
                    placeholder="Write here your message!" 
                    maxLength={150}
                    onChange={(e)=> setText(e.target.value)}
                ></textarea>
                <button className="cmt_btn" onClick={()=>{
                    sendMessage(text);
                    updateMessage();
                }}>Send!</button>
            </div>
        </div>
    )
}

export {
    Popup
};