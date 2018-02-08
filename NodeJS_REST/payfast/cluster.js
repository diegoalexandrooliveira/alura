let cluster = require("cluster");
let os = require("os");

if (cluster.isMaster) {

    // os.cpus().forEach(element => {
    //     cluster.fork();
    // });
    for (let i = 0; i <= 7; i++) {
        cluster.fork();
    }
    console.log("Executando master");
} else {
    console.log("Executando slave");
    require("./index.js");
}