"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
};
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB}.ucllv.mongodb.net/walter-backend?retryWrites=true&w=majority`;
mongoose_1.default.connect(url, options).then(function () {
    console.log('MongoDB is connected');
})
    .catch(function (err) {
    console.log(err);
});
//# sourceMappingURL=db.js.map