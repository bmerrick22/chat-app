const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIo = require('socket.io');
const io = socketIo(server);


const chatRoutes = require('./routes/chatRoutes')(io);
const port = process.env.PORT || 3000;
server.listen(port, () =>{
    console.log('Started listening on port: ' + port);
});


