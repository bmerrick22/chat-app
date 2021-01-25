const events = require('../events');
const ServerData = require('../data/serverData');
const serverData = new ServerData();
module.exports = (io) => {

    const newMessage = (msg) => {
        console.log(msg);
        io.emit(events.NEW_MESSAGE, msg);
    };

    const userLogin = (socket, data) => {
        let result = serverData.verifyLogin(data);
        socket.emit(events.LOGIN_STATUS, {username: data.username, status: result})
    };

    const disconnectUser = (user) =>{
        serverData.removeConnectedUser(user);
        io.emit(events.USER_LEFT, serverData.getConnectedUsers());  
    };

    const newUser = (user) =>{
        serverData.addConnectedUser(user)
        io.emit(events.CONNECTED_USERS, serverData.getConnectedUsers());
    };

    io.on(events.CONNECTION, (socket) => {
        console.log("User Connected");

        socket.on(events.USER_LOGIN, (data) => {
            userLogin(socket, data);
        });

        socket.on(events.MESSAGE_SENT, (msg) => {
            console.log(msg);
            newMessage(msg);
        });

        socket.on(events.DISCONNECT, () => {
            //disconnectUser(user);
            console.log('User disconnected');
        });

        socket.on(events.NEW_USER, (user) => {
            newUser(user);
        });
    });
};