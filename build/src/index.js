"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var server_1 = __importDefault(require("./server"));
server_1.default.listen(config_1.PORT, function () {
    console.log('Express server listening on port ' + config_1.PORT);
});
