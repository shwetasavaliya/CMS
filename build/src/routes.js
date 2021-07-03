"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var user_controller_1 = __importDefault(require("./api/user/user.controller"));
var basePath = "/api/v1";
function initRoute(app) {
    routing_controllers_1.useExpressServer(app, {
        controllers: [
            user_controller_1.default
        ],
        defaultErrorHandler: true,
        routePrefix: basePath
    });
}
exports.default = initRoute;
