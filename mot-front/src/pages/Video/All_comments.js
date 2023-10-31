function Comment({ id, src, channel, date, text }) {
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
    <span id="data_comment">{date}</span>
    </div>
    <div id="comment_text">{text}</div>
</div>
);
}

function AllComments() {
    //Realizar requisicao aqui
    const data = [
    { id: 1, src: "./images/spiderman.jpg", channel: "Fish", date:"01/02/03", text: "Lorem ipsum odio suspendisse posuere curae interdum nisl imperdiet hendrerit fusce, ut accumsan erat fermentum risus accumsan hac orci donec dolor, libero lorem nunc conubia cubilia condimentum rhoncus nullam praesent. inceptos proin ultricies himenaeos a risus malesuada vel elementum quisque in, ligula iaculis primis vulputate auctor ut in vitae fames taciti, etiam nisl pulvinar aliquam id pellentesque consequat risus rhoncus. lobortis erat convallis bibendum iaculis viverra tristique luctus ullamcorper fringilla neque elit eget turpis blandit primis, sodales sociosqu placerat tristique pharetra inceptos senectus consectetur dictumst cras consectetur sollicitudin nam eget." },
    { id: 2, src: "./images/machinarium.png", channel: "Chicken", date:"20/12/15", text: "Muito bom!" },
    { id: 3, src: "./images/harrypop.png", channel: "Potato", date:"10/04/20", text: "Meio estranho" },
    { id: 4, src: "./images/image1.jpg", channel: "Hamburger", date:"21/07/23", text: "Nao gostei" },
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
