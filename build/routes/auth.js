"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authJwt_1 = require("../middlewares/authJwt");
const verifySignUp_1 = require("../middlewares/verifySignUp");
const router = express_1.Router();
router.post('/signup', verifySignUp_1.checkDuplicateUsername, auth_1.register);
router.post('/signin', auth_1.login);
router.patch('/reset-password', authJwt_1.requireAuth, auth_1.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map