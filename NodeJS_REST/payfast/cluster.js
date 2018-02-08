let cluster = require("cluster");
let os = require("os");

if (cluster.isMaster) {

    os.cpus().forEach(element => {
        cluster.fork();
    });

    console.log("Executando master");

    cluster.on("listening", (worker) => {
        console.log("Slave id: " + worker.process.pid)
    });

    cluster.on("exit", (worker) => {
        console.log("Slave caiu, id: " + worker.process.pid);
        cluster.fork();
    });
} else {
    console.log("Executando slave");
    require("./index.js");
}