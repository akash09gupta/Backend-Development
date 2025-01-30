//server creation
const http = require("http");

const server = http.createServer(function(req, res){
    res.end("Hello Akash!");
})

server.listen(3000);