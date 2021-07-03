"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var response_1 = require("./middleware/response");
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var mongo_db_1 = __importDefault(require("./utils/db/mongo.db"));
var typeorm_1 = require("typeorm");
var typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.use(body_parser_1.json());
        this.app.use(response_1.responseEnhancer());
        this.app.use(cors_1.default());
        routes_1.default(this.app);
        typeorm_1.useContainer(typeorm_typedi_extensions_1.Container);
        mongo_db_1.default();
    }
    return Server;
}());
exports.default = new Server().app;
