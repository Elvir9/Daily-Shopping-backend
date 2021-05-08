"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, auth_1.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ error: error.message });
            }
            else {
                res.locals.jwt = decodedToken;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authJwt.js.map