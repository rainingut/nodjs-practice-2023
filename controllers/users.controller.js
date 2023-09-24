import UserModel from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_KEY = '🐿️🐇🦔🦫🐀🦈🦦🐳🦭';

const isMissing = (res, cond) => {
    if(cond) {
        return res
        .status(400)
        .send({ state: 'fail', message: 'something missing!', });
    }
}

export const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    isMissing(res, (!username || !email || !password));
    if(UserModel.users[email]) {
      return res
      .status(400)
      .send({ state: 'fail', message: 'email is exist !', });
    };
    const bcryptPsw = await bcrypt.hash(password, 10);
    UserModel.users[email] = { username, password: bcryptPsw };
    return res.status(200).send({state: 'success', });
}

export const findUser =  async(req, res, next) => {
    const { email, password } = req.body;
    isMissing(res, (!email || !password));
    const user = UserModel.users[email];
    if(!user) {
        return res.status(401).send({ state: 'fail', message: 'user is not exist!' });
    }
    const isPswRight = await bcrypt.compare(password, user.password);
    if(!isPswRight){
        return res.status(401).send({state: 'fail', message: 'password wrong!'});
    }
    const token = jwt.sign({username: user.username,  email}, JWT_KEY);
    return res.status(200).send({state: 'success', token});
}

export const getUserInfo = (req, res, next) => {
    const user = isValidUser(req, res, next);
    return res.status(200).send({state: 'success', data: user});
}

export const isValidUser = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send({state: 'fail', message: 'go sign in'});
    }
    return jwt.verify(token, JWT_KEY, (error, user) => {
        if(error){
            return res.status(403).send({state:'fail', message: 'token error', error});
        }
        return user;
    })
}

export default {
    createUser,
    findUser,
    getUserInfo,
    isValidUser,
};