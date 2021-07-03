"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseEnhancer = void 0;
var language_constant_1 = require("../utils/mapper/language.constant");
var mapper_1 = require("../utils/mapper/mapper");
/**
 * Date: June 30, 2021
 * Author: Kishan Talaviya
 * Function defination:
 *   provides a common response that will be sent to each request based
 *   on the status received from the controller function inside response
 *
 * req @params
 *
 * res @params
 */
var responseEnhancer = function () { return function (req, res, next) {
    res.formatter = _generateFormatters(req, res);
    next();
}; };
exports.responseEnhancer = responseEnhancer;
var _generateFormatters = function (req, res) {
    var _a, _b;
    var formatter = {};
    var responseBody = {};
    var language = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.language) || ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.language) || 'en', lang = getLanguage(language);
    formatter['ok'] = function (data, status, code) {
        responseBody = _generateSuccessResponse({ data: data, status: status, code: code, lang: lang });
        return responseBody;
    };
    formatter['error'] = function (data, status, code, err) {
        responseBody = _generateErrorResponse({ data: data, status: status, code: code, err: err, lang: lang });
        return responseBody;
    };
    return formatter;
};
var _generateSuccessResponse = function (_a) {
    var data = _a.data, status = _a.status, code = _a.code, _b = _a.lang, lang = _b === void 0 ? 'en' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, mapper_1.mapStatusLang(lang, 'success', code)];
                case 1:
                    message = _c.sent();
                    return [2 /*return*/, {
                            status: status,
                            success: {
                                code: code,
                                message: message,
                                data: JSON.parse(JSON.stringify(data)) // to check and find a better solution
                            },
                            error: null
                        }];
            }
        });
    });
};
var _generateErrorResponse = function (_a) {
    var data = _a.data, status = _a.status, code = _a.code, err = _a.err, _b = _a.lang, lang = _b === void 0 ? 'en' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, mapper_1.mapStatusLang(lang, 'error', code)];
                case 1:
                    message = _c.sent();
                    return [2 /*return*/, {
                            status: status,
                            error: {
                                code: code,
                                message: message,
                                data: data,
                                errorStack: (err === null || err === void 0 ? void 0 : err.message) || err
                            },
                            success: null
                        }];
            }
        });
    });
};
var getLanguage = function (lang) {
    return parseInt(lang) ? language_constant_1.LANGUAGES[lang] : lang;
};
