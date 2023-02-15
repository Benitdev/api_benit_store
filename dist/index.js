"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start");
const jet_logger_1 = __importDefault(require("jet-logger"));
const process_1 = require("process");
const EnvVars_1 = __importDefault(require("@src/declarations/major/EnvVars"));
const server_1 = __importDefault(require("./server"));
const mongoose_1 = __importDefault(require("mongoose"));
const msg = "Express server started on port: " + EnvVars_1.default.port.toString();
mongoose_1.default
    .connect(EnvVars_1.default.mongooseURI)
    .then(() => {
    server_1.default.listen(EnvVars_1.default.port, () => jet_logger_1.default.info(msg));
    console.log("mongodb is connected");
})
    .catch((err) => {
    console.log(err);
    (0, process_1.exit)(1);
});
