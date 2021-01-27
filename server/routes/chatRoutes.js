const events = require('../events');
const ServerData = require('../data/serverData');
const { LOGIN_ATTEMPT } = require('../events');
const serverData = new ServerData();
module.exports = (io) => {

    const newMessage = (msg) => {
        io.emit(events.NEW_MESSAGE, msg);
    };

    const disconnectUser = (user) => {
        serverData.removeConnectedUser(user);
        io.emit(events.USER_LEFT, serverData.getConnectedUsers());
    };

    const newUser = (user) => {
        serverData.addConnectedUser(user);
        io.emit(events.CONNECTED_USERS, serverData.getConnectedUsers());
    };

    const loginAttempt = (socket, attempt) => {
        //Return the username and status of the attempted login
        socket.emit(events.LOGIN_RESULT, {username: attempt.username, status: serverData.verifyLogin(attempt)});
    };

    io.on(events.CONNECTION, (socket) => {
        console.log("User Connected");

        socket.on(events.MESSAGE_SENT, (msg) => {
            newMessage(msg);
        });

        socket.on(events.DISCONNECT, () => {
            //disconnectUser(user);
            console.log('User disconnected');
        });

        socket.on(events.NEW_USER, (user) => {
            newUser(user);
        });

        //User login has been attempted
        socket.on('login-attempt', (attempt) => {
            loginAttempt(socket, attempt);
        });
    });
};