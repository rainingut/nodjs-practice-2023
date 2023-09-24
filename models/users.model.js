import { v4 as uuidv4 } from 'uuid';

class UserModel {
    users = {};
    constructor(){
        this.users = {
            "a@gmail.com": {
                username: 'a',
                password: ''
            }
        };
    }

    getUser(email){
        return users[email];
    }

    createUser(data){
        const newUser = {
            username: data.username,
            password: data.password,
            id: uuidv4()
        };
        this.users[data.email] = newUser;
        return newUser;
    }
}

export default new UserModel();