"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.changePassword = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../config/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const JWT_sign_1 = require("../utils/JWT.sign");
// Registration for new user
const register = (req, res, next) => {
    const { username, password } = req.body;
    try {
        bcrypt_1.default.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(401).json({
                    message: hashError.message,
                    error: hashError
                });
            }
            const _user = new user_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                username,
                password: hash
            });
            return _user
                .save()
                .then((user) => {
                return res.status(201).json({
                    user
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
        });
    }
    catch (error) {
        return res.status(401).json({ error: error });
    }
};
exports.register = register;
// User login
const login = (req, res, next) => {
    const { username, password } = req.body;
    user_1.default.find({ username })
        .exec()
        .then(users => {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        bcrypt_1.default.compare(password, users[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Check email or password'
                });
            }
            else if (result) {
                JWT_sign_1.signWithJWT(users[0], (_error, token) => {
                    if (_error) {
                        return res.status(500).json({
                            message: _error.message,
                            error: _error
                        });
                    }
                    else if (token) {
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            user: users[0]
                        });
                    }
                });
            }
            else {
                return res.status(401).json({ success: false, message: 'passwords do not match' });
            }
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
};
exports.login = login;
// Reset users password
const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, auth_1.JWT_SECRET);
        const _id = user.id;
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await user_1.default.updateOne({ _id }, {
            $set: { password: hashedPassword }
        });
        res.status(200).json({ status: 'Password changed!' });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.changePassword = changePassword;
const profile = async (req, res) => {
    const user = await user_1.default.findById(req.body.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('No User found');
    }
    res.json(user);
};
exports.profile = profile;
//# sourceMappingURL=auth.js.map