"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const jet_logger_1 = __importDefault(require("jet-logger"));
const EnvVars_1 = __importDefault(require("@src/declarations/major/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/declarations/major/HttpStatusCodes"));
const enums_1 = require("@src/declarations/enums");
const classes_1 = require("@src/declarations/classes");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const fs_1 = require("fs");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const routes_1 = __importDefault(require("./routes"));
const typeDefs = (0, fs_1.readFileSync)("./src/graphql/schema.graphql", {
    encoding: "utf-8",
});
const app = (0, express_1.default)();
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default,
});
const startServer = async () => {
    await server.start();
    app.use("/graphql", (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }));
};
startServer();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.cookieProps.secret));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
if (EnvVars_1.default.nodeEnv === enums_1.NodeEnvs.Dev) {
    app.use((0, morgan_1.default)("dev"));
}
if (EnvVars_1.default.nodeEnv === enums_1.NodeEnvs.Production) {
    app.use((0, helmet_1.default)());
}
app.use("/api/v1", routes_1.default);
app.use((err, _, res, next) => {
    jet_logger_1.default.err(err, true);
    let status = HttpStatusCodes_1.default.BAD_REQUEST;
    if (err instanceof classes_1.RouteError) {
        status = err.status;
    }
    return res.status(status).json({ error: err.message });
});
exports.default = app;
