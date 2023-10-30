import React from 'react';

function Comment({ id, src, channel, text }) {
return (
<div className="comment" id={id}>
    <div className="c_profile">
    <button className="c_prof_btn">
        <img
        id="userphoto"
        itemID="userphoto"
        src={src}
        alt="Foto do Usuario"
        />
    </button>
    <span id="channel_name_prof">{channel}</span>
    </div>
    <div id="comment_text">{text}</div>
</div>
);
}

function AllComments() {
    //Realizar requisicao aqui
    const data = [
    { id: 1, src: "./images/spiderman.jpg", channel: "Fish", text: "Otimo video!!!" },
    { id: 2, src: "./images/machinarium.png", channel: "Chicken", text: "Muito bom!" },
    { id: 3, src: "./images/harrypop.png", channel: "Potato", text: "Meio estranho" },
    { id: 4, src: "./images/image1.jpg", channel: "Hamburger", text: "Nao gostei" },
    ];

    return (
    <div>
        {data.map(com => (
            <Comment key={com.id} {...com} />
        ))}
    </div>
);
}

export default AllComments;
