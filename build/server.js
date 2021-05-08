"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const list_1 = __importDefault(require("./routes/list"));
const app = express_1.default();
const port = 8080;
mongoose_1.default.connect(`mongodb+srv://elvir:test@cluster0.ucllv.mongodb.net/walter-backend?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
    console.log("Successfully connect to MongoDB");
})
    .catch(err => {
    console.error("Connection error", err);
    process.exit();
});
// Middlewares
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/auth', list_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=server.js.map