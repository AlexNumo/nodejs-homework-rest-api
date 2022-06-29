const authService = require('../services/auth.service');
const emailService = require('../services/email.service');
const {createError} = require("../helpers/errors");
const userService = require('../services/user.services');


const registerUser = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        await emailService.sendEmail(user.email, user.verificationToken);
        res.status(201).json({
            code: 201,
            data: {
                name: user.name,
                email: user.email,
                subscription: user.subscription,
                id: user._id,
                avatarURL: user.avatarURL,
            }
        });
    } catch (e) {
        next(e);
    }
}

const confirm = async (req, res, next) => {
    try {
        const {verificationToken} = req.params;
        const user = await userService.findUser({verificationToken});
        if(!user) {
            throw createError(404, 'User not found');
        }
        await userService.updateUser(user._id, {verify: true, verificationToken: null });
        return res.status(200).json({
            code: 200,
            message: "Email was confirmed",
        });
    } catch (e) {
        next(e);
    }
}

const resend = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await userService.findUser({email});
        if(!user) {
            throw createError(404, 'User was not found');
        }

        if(!user.verify) {
            return res.json({message: 'please, verify your account'})
        }
        await emailService.sendEmail(user.email, user.verificationToken);
        return res.status(200).json({
            code: 200,
            message: 'check your email'
        });
    } catch (e) {
        next(e);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {token, email, subscription} = await authService.loginUser(req.body);
        res.json({token, email, subscription});
    } catch (e) {
        next(e);
    }
}

const logoutUser = async (req, res, next) => {
    try {
        await authService.logoutUser(req.user._id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    registerUser, loginUser, logoutUser, resend, confirm
}
