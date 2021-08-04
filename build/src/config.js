"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_CONFIG = exports.AWS_INVOICE_URL = exports.BASE_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.PASSWORD = exports.USEREMAIL = exports.REFRESH_TOKEN = exports.REDIRECT_URL = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.AWS_S3_BUCKET_NAME = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = exports.SECRET_KEY = exports.MONGO_URL = exports.PORT = exports.isLocal = void 0;
var path = __importStar(require("path"));
var envType = (_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim();
exports.isLocal = envType === 'local';
require('dotenv').config({
    path: path.join(__dirname, '..', ".env" + (exports.isLocal ? '.local' : ''))
});
exports.PORT = process.env.PORT || 3100;
exports.MONGO_URL = process.env.MONGO_URL || '';
exports.SECRET_KEY = process.env.SECRET_KEY || '';
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
exports.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
exports.CLIENT_ID = process.env.CLIENT_ID || '';
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || '';
exports.REDIRECT_URL = process.env.REDIRECT_URL || '';
exports.REFRESH_TOKEN = process.env.REFRESH_TOKEN || '';
exports.USEREMAIL = process.env.USEREMAIL || '';
exports.PASSWORD = process.env.PASSWORD || '';
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
exports.BASE_URL = process.env.BASE_URL || '';
exports.AWS_INVOICE_URL = process.env.AWS_INVOICE_URL || '';
exports.MONGO_CONFIG = {
    poolSize: parseInt(process.env.MONGO_POOL_SIZE || '') || 5
};
