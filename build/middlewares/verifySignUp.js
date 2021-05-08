"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateUsername = void 0;
const user_1 = __importDefault(require("../models/user"));
const checkDuplicateUsername = (req, res, next) => {
    try {
        user_1.default.findOne({
            username: req.body.username
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: 'Username is already in use!' });
            }
        });
        next();
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
};
exports.checkDuplicateUsername = checkDuplicateUsername;
//# sourceMappingURL=verifySignUp.js.map