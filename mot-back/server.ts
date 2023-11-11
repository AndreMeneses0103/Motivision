import App from "./app";

const port = process.env.PORT || 3000;
const serv = new App();
serv.start(port);