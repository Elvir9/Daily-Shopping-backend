"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const port = 3000;
router.get('/', (req, res) => {
    res.send('Hellooo!');
});
router.listen(port, () => {
    // if (err) {
    //   return console.error(err);
    // }
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map