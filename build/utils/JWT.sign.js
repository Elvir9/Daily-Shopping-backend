"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signWithJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const signWithJWT = (user, callback) => {
    let expirationTimeInSeconds = 60 * 60 * 24;
    try {
        jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username
        }, auth_1.JWT_SECRET, {
            issuer: 'elvir-issuer',
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        callback(error, null);
    }
};
exports.signWithJWT = signWithJWT;
//# sourceMappingURL=JWT.sign.js.map