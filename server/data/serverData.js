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
        this.users.set("root", {password: "root", connection: false});
        this.users.set("root2",{password: "root2", connection: false});
    }

    verifyLogin(attempt){
        console.log("--Login Attempt--");
        console.log(attempt);
        //Determine if username is in system
        if(this.users.has(attempt.username)){
            //Appropriate username...what about a correct password?
            let user = this.users.get(attempt.username)
            if( (user.password === attempt.password) && (user.connection === false)){
                //Update connection status
                let update = {password: user.password, connection: true};
                this.users.set(user.username, update);
                //Correct username and password
                console.log("Valid server login")
                return true;
            }
            //Not correct password
            console.log("Invalid server login");
            return false;
        }
        //username is not in system
        console.log("Invalid server login");
        return false;
    }


    disconnectUser(user){
    }

}