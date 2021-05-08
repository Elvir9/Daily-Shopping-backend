"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_1 = require("../controllers/list");
const authJwt_1 = require("../middlewares/authJwt");
const router = express_1.Router();
router.post('/create-list', authJwt_1.requireAuth, list_1.shoppingList);
router.delete('/delete/:id', authJwt_1.requireAuth, list_1.deleteList);
router.get('/list/:userId', authJwt_1.requireAuth, list_1.getList);
router.patch('/edit/:id', authJwt_1.requireAuth, list_1.editList);
router.get('/aggregate', list_1.aggregateList);
exports.default = router;
//# sourceMappingURL=list.js.map