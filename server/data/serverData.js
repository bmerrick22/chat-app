module.exports = class ServerData {
    constructor() {
        //Declare the user login map
        this.users = new Map();
        //Declare all of the currently connected users
        this.connections = [];
        //Add test users
        this.baseUsers();
    }

    baseUsers() {
        this.users.set("root", "root");
        this.users.set("root2", "root2");
    }

    addConnectedUser(username) {
        if(this.connections.indexOf(username) == -1)
            this.connections.push(username);
    }

    getConnectedUsers() {
        return this.connections;
    }

    removeConnectedUser(username) {
        this.connections = this.connections.filter(function (user) {
            return user !== username;
        });
    }

    verifyLogin(data) {
        console.log(data);
        if (this.users.has(data.username)) {
            if (this.users.get(data.username) == data.password) {
                this.addConnectedUser(data.username);
                return true;
            }
        } else {
            return false;
        }
    }





}