const {User} = require('../models/user');
const {createError} = require("../helpers/errors");
const bcrypt = require('bcryptjs');
const {SECRET_KEY} = require("../helpers/env");
const jwt = require('jsonwebtoken');


// 1. if User exists in our db -> send error status 409;
// 2. if it is a new User -> hash and salt password -> save User to DB

const registerUser = async (userData) => {
    const result = await User.findOne({email: userData.email});
    if(result) {
        throw createError(409, 'Email in use')
    }

    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user =
        await User.create({
            ...userData,
            password: hashedPassword,
        });

    return user;
}

const loginUser = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) {
        throw createError(401, 'Login or password is wrong');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        throw createError(401, 'Login or password is wrong');
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    await User.findByIdAndUpdate(user._id, {token})
    return {
        token
    }
}

const authenticateUser = async (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const {id} = payload;
        const user = await User.findById(id);
        return user.token !== token ? null : user;
    } catch (e) {
        return null;
    }
}

module.exports = {
    registerUser, loginUser, authenticateUser
}
