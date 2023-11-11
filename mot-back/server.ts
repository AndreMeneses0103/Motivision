import App from "./app";

const port = process.env.PORT || 3000;
const serv = new App();
serv.start(port);

async function finish() {
    console.log("Encerrando...");
    await serv.stop;
    process.exit(0);
}

process.on('SIGINT', finish);
process.on('SIGTERM', finish);