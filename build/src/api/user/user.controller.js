"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var user_service_1 = __importDefault(require("./user.service"));
var user_validator_1 = require("./user.validator");
var console_1 = __importDefault(require("console"));
var auth_1 = require("../../middleware/auth");
var company_service_1 = __importDefault(require("../company/company.service"));
var comman_utils_1 = require("../../utils/comman/comman.utils");
var user_utils_1 = require("./user.utils");
var crypto_1 = __importDefault(require("crypto"));
var passport_1 = __importDefault(require("passport"));
var config_1 = require("../../config");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, undefined);
});
passport_1.default.use(new GoogleStrategy({
    clientID: config_1.GOOGLE_CLIENT_ID,
    clientSecret: config_1.GOOGLE_CLIENT_SECRET,
    callbackURL: config_1.BASE_URL + "/api/v1/user/loginwithgoogle/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    return done(undefined, profile);
}));
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new user_service_1.default();
        this.companyService = new company_service_1.default();
    }
    UserController.prototype.register = function (request, response, body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, firstName, middleName, lastName, userName, phone, city, state, country, companyName, companyAddress, companyMobile, companyEmail, companyGstNo, companyPanNo, userExists, hashedPassword, userData, companyDetails, companyData, userCreate, id, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        email = body.email, password = body.password, firstName = body.firstName, middleName = body.middleName, lastName = body.lastName, userName = body.userName, phone = body.phone, city = body.city, state = body.state, country = body.country, companyName = body.companyName, companyAddress = body.companyAddress, companyMobile = body.companyMobile, companyEmail = body.companyEmail, companyGstNo = body.companyGstNo, companyPanNo = body.companyPanNo;
                        return [4 /*yield*/, this.userService.findOne({ email: email })];
                    case 1:
                        userExists = _a.sent();
                        if (userExists)
                            return [2 /*return*/, response.formatter.error({}, false, "USER_ALREADY_EXISTS")];
                        return [4 /*yield*/, comman_utils_1.hashPassword(password)];
                    case 2:
                        hashedPassword = _a.sent();
                        userData = {
                            email: email,
                            password: hashedPassword,
                            firstName: firstName,
                            middleName: middleName,
                            lastName: lastName,
                            userName: userName,
                            phone: phone,
                            city: city,
                            state: state,
                            country: country,
                        };
                        companyDetails = {
                            companyName: companyName,
                            companyAddress: companyAddress,
                            companyMobile: companyMobile,
                            companyEmail: companyEmail,
                            companyGstNo: companyGstNo,
                            companyPanNo: companyPanNo,
                        };
                        return [4 /*yield*/, this.companyService.create(companyDetails)];
                    case 3:
                        companyData = _a.sent();
                        if (!companyData)
                            return [2 /*return*/, response.formatter.error({}, false, "COMPANY_REGISTRATION_FAILED")];
                        userData.companyId = companyData._id;
                        return [4 /*yield*/, this.userService.create(userData)];
                    case 4:
                        userCreate = _a.sent();
                        id = userCreate._id;
                        token = comman_utils_1.jwtTokenGenerate({
                            id: id,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phone: phone,
                        });
                        return [2 /*return*/, response.formatter.ok(__assign(__assign({}, userData), { companyData: companyData, token: token }), true, "USER_REGISTER_SUCCESS")];
                    case 5:
                        error_1 = _a.sent();
                        console_1.default.log("ERR:: ", error_1);
                        return [2 /*return*/, response.formatter.error({}, false, "USER_REGISTER_FAILED", error_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (request, response, body) {
        return __awaiter(this, void 0, void 0, function () {
            var userName, email, password, query, user, isMatch, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userName = body.userName, email = body.email, password = body.password;
                        query = {};
                        if (email)
                            query = { email: email };
                        if (userName)
                            query = { userName: userName };
                        return [4 /*yield*/, this.userService.findOne(query, {}, {
                                _id: 1,
                                userName: 1,
                                email: 1,
                                password: 1,
                                firstName: 1,
                                lastName: 1,
                                phone: 1,
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, response.formatter.error({}, false, "USER_NOT_EXISTS")];
                        return [4 /*yield*/, comman_utils_1.compareBcryptPassword(password, user.password)];
                    case 2:
                        isMatch = _a.sent();
                        if (!isMatch)
                            return [2 /*return*/, response.formatter.error({}, false, "INVALID_LOGIN_DETAILS")];
                        token = comman_utils_1.jwtTokenGenerate({
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                        });
                        delete user.password;
                        return [2 /*return*/, response.formatter.ok(__assign(__assign({}, user), { token: token }), true, "USER_LOGIN_SUCCESS")];
                    case 3:
                        error_2 = _a.sent();
                        console_1.default.log("ERR:: ", error_2);
                        return [2 /*return*/, response.formatter.error({}, false, "USER_LOGIN_FAILED", error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateProfile = function (request, response, body) {
        return __awaiter(this, void 0, void 0, function () {
            var id, firstName, middleName, lastName, userName, fileName, update, isBlank, newUserData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = ((request === null || request === void 0 ? void 0 : request.data) || { id: "" }).id;
                        firstName = body.firstName, middleName = body.middleName, lastName = body.lastName, userName = body.userName, fileName = body.fileName;
                        update = {
                            $set: {},
                        };
                        isBlank = user_utils_1.checkBlank([
                            firstName,
                            middleName,
                            lastName,
                            userName,
                            fileName,
                        ]);
                        if (isBlank)
                            return [2 /*return*/, response.formatter.error({ isBlank: isBlank }, false, "USER_DATA_IS_NOT_FOUND")];
                        if (firstName)
                            update.$set.firstName = firstName;
                        if (middleName)
                            update.$set.middleName = middleName;
                        if (lastName)
                            update.$set.lastName = lastName;
                        if (userName)
                            update.$set.userName = userName;
                        if (fileName)
                            update.$set.profilePictures = {
                                orignal: fileName,
                                thumb: fileName,
                            };
                        return [4 /*yield*/, this.userService.update({ _id: id }, update)];
                    case 1:
                        newUserData = _a.sent();
                        if (!newUserData)
                            return [2 /*return*/, response.formatter.error({ newUserData: newUserData }, false, "USER_NOT_EXISTS")];
                        return [2 /*return*/, response.formatter.ok({ newUserData: newUserData }, true, "USER_UPDATE_SUCCESS")];
                    case 2:
                        error_3 = _a.sent();
                        console_1.default.log("ERR:: ", error_3);
                        return [2 /*return*/, response.formatter.error({}, false, "USER_UPDATE_FAILED", error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.checkEmail = function (request, response, body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, otp, otpUpdate, resetPasswordToken, updateToken, sendemail, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        email = body.email;
                        return [4 /*yield*/, this.userService.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, response.formatter.error({}, false, "ENTER_VALID_EMAIL")];
                        otp = comman_utils_1.otpGenerate();
                        return [4 /*yield*/, this.userService.updateOne({ email: email }, { $set: { otp: otp } }, { new: true })];
                    case 2:
                        otpUpdate = _a.sent();
                        if (!otpUpdate)
                            return [2 /*return*/, response.formatter.error({}, false, "OTP_IS_NOT_UPDATE")];
                        return [4 /*yield*/, crypto_1.default.randomBytes(24).toString("hex")];
                    case 3:
                        resetPasswordToken = _a.sent();
                        return [4 /*yield*/, this.userService.updateOne({ email: email }, { $set: { resetPasswordToken: resetPasswordToken } }, { new: true })];
                    case 4:
                        updateToken = _a.sent();
                        if (!updateToken)
                            return [2 /*return*/, response.formatter.error({}, false, "LINK_GENERATE_FAILED")
                                // const firstName = user.firstName
                            ];
                        return [4 /*yield*/, comman_utils_1.sendEmail(user.firstName, email, resetPasswordToken)];
                    case 5:
                        sendemail = _a.sent();
                        if (!sendemail)
                            return [2 /*return*/, response.formatter.error({}, false, "EMAIL_SEND_FAILED")];
                        return [2 /*return*/, response.formatter.ok({}, true, "EMAIL_SEND_SUCCESS")];
                    case 6:
                        error_4 = _a.sent();
                        console_1.default.log("ERR:: ", error_4);
                        return [2 /*return*/, response.formatter.error({}, false, "EMAIL_CHECK_FAILED", error_4)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // @Post("/verifyotp")
    // async verifyOtp(
    //   @Req() request: any,
    //   @Res() response: any,
    //   @Body({ validate: true }) body: OtpDTO
    // ) {
    //   try {
    //     const { email } = body;
    //     const user = await this.userService.findOne({ email });
    //     if (!user)
    //       return response.formatter.error({}, false, "ENTER_VALID_EMAIL");
    //     if (user.otp != request.body.otp)
    //       return response.formatter.error({}, false, "OTP_IS_NOT_MATCH");
    //     const updateOtp = await this.userService.updateOne(
    //       { email },
    //       { $unset: { otp: '' } },
    //       { new: true }
    //     );
    //     return response.formatter.ok({ updateOtp }, true, "OTP_VERIFICATION_SUCCESS");
    //   } catch (error) {
    //     console.log("ERR:: ", error);
    //     return response.formatter.error({}, false, "OTP_VERIFICATION_FAILED", error);
    //   }
    // }
    UserController.prototype.forgotPassword = function (request, response, body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, resetPasswordToken, user, hashedPassword, updatePassword, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        email = body.email, password = body.password;
                        resetPasswordToken = request.params.token;
                        return [4 /*yield*/, this.userService.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, response.formatter.error({}, false, "ENTER_VALID_EMAIL")];
                        if (user.resetPasswordToken != resetPasswordToken)
                            return [2 /*return*/, response.formatter.error({}, false, "INVALID_TOKEN")];
                        return [4 /*yield*/, comman_utils_1.hashPassword(password)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userService.updateOne({ email: email }, { $set: { password: hashedPassword }, $unset: { resetPasswordToken: resetPasswordToken } }, { new: true })];
                    case 3:
                        updatePassword = _a.sent();
                        if (!updatePassword)
                            return [2 /*return*/, response.formatter.error({}, false, "PASSWORD_UPDATE_FAILED")];
                        return [2 /*return*/, response.formatter.ok({}, true, "FORGOT_PASSWORD_SUCCESS")];
                    case 4:
                        error_5 = _a.sent();
                        console_1.default.log("ERR:: ", error_5);
                        return [2 /*return*/, response.formatter.error({}, false, "FORGOT_PASSWORD_FAILED", error_5)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.changePassword = function (request, response, body) {
        return __awaiter(this, void 0, void 0, function () {
            var id, oldPassword, newPassword, user, isMatch, hashedPassword, changePassword, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = ((request === null || request === void 0 ? void 0 : request.data) || { id: "" }).id;
                        oldPassword = body.oldPassword, newPassword = body.newPassword;
                        return [4 /*yield*/, this.userService.findOne({ _id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, response.formatter.error({}, false, "USER_NOT_EXISTS")];
                        return [4 /*yield*/, comman_utils_1.compareBcryptPassword(oldPassword, user.password)];
                    case 2:
                        isMatch = _a.sent();
                        if (!isMatch)
                            return [2 /*return*/, response.formatter.error({}, false, "PASSWORD_NOT_MATCH")];
                        return [4 /*yield*/, comman_utils_1.hashPassword(newPassword)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userService.updateOne({ _id: id }, { $set: { password: hashedPassword } }, { new: true })];
                    case 4:
                        changePassword = _a.sent();
                        if (!changePassword)
                            return [2 /*return*/, response.formatter.error({}, false, "USER_NOT_EXISTS")];
                        delete user.password;
                        return [2 /*return*/, response.formatter.ok({ user: user }, true, "CHANGE_PASSWORD_SUCCESS")];
                    case 5:
                        error_6 = _a.sent();
                        console_1.default.log("ERR:: ", error_6);
                        return [2 /*return*/, response.formatter.error({}, false, "CHANGE_PASSWORD_FAILED", error_6)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.loginGoogle = function (request, response) {
        passport_1.default.authenticate("google", { scope: ["profile", "email"], session: false })(request, response);
    };
    UserController.prototype.loginGoogleCallback = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, user_email, userExists, userExistsToken, userName, firstName, lastName, data, newUserData, newUserToken, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        user = request.user;
                        user_email = user.emails[0].value;
                        return [4 /*yield*/, this.userService.findOne({ email: user_email })];
                    case 1:
                        userExists = _a.sent();
                        return [4 /*yield*/, comman_utils_1.jwtTokenGenerate({ _id: userExists === null || userExists === void 0 ? void 0 : userExists._id, firstName: userExists === null || userExists === void 0 ? void 0 : userExists.firstName, email: userExists === null || userExists === void 0 ? void 0 : userExists.email })];
                    case 2:
                        userExistsToken = _a.sent();
                        if (userExists)
                            return [2 /*return*/, response.formatter.ok({ userExists: userExists, userExistsToken: userExistsToken }, true, "USER_LOGIN_SUCCESS")];
                        userName = user.displayName;
                        firstName = user.name.givenName;
                        lastName = user.name.familyName;
                        data = {
                            email: user_email,
                            firstName: firstName,
                            lastName: lastName,
                            userName: userName,
                            is_email_verified: true
                        };
                        return [4 /*yield*/, this.userService.create(data)];
                    case 3:
                        newUserData = _a.sent();
                        if (!newUserData)
                            return [2 /*return*/, response.formatter.error({}, false, "USER_LOGIN_FAILED")];
                        return [4 /*yield*/, comman_utils_1.jwtTokenGenerate({ _id: newUserData._id, firstName: firstName, lastName: lastName, userName: userName })];
                    case 4:
                        newUserToken = _a.sent();
                        return [2 /*return*/, response.formatter.ok(__assign(__assign({}, data), { newUserToken: newUserToken }), true, "USER_LOGIN_SUCCESS")];
                    case 5:
                        error_7 = _a.sent();
                        console_1.default.log("ERR:: ", error_7);
                        return [2 /*return*/, response.formatter.error({}, false, "USER_LOGIN_FAILED", error_7)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Post("/register", { transformResponse: true }),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __param(2, routing_controllers_1.Body({ validate: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, user_validator_1.UserDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "register", null);
    __decorate([
        routing_controllers_1.Post("/login"),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __param(2, routing_controllers_1.Body({ validate: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, user_validator_1.LoginDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "login", null);
    __decorate([
        routing_controllers_1.Put("/update"),
        routing_controllers_1.UseBefore(auth_1.Auth),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __param(2, routing_controllers_1.Body({ validate: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, user_validator_1.UpdateDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "updateProfile", null);
    __decorate([
        routing_controllers_1.Post("/check-user-email"),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __param(2, routing_controllers_1.Body({ validate: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, user_validator_1.ChechEmailDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "checkEmail", null);
    __decorate([
        routing_controllers_1.Post("/forgot-password/:token"),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __param(2, routing_controllers_1.Body({ validate: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, user_validator_1.ForgotPasswordDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "forgotPassword", null);
    __decorate([
        routing_controllers_1.Put("/change-password"),
        routing_controllers_1.UseBefore(auth_1.Auth),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __param(2, routing_controllers_1.Body({ validate: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, user_validator_1.ChangePasswordDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "changePassword", null);
    __decorate([
        routing_controllers_1.Get("/loginwithgoogle"),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "loginGoogle", null);
    __decorate([
        routing_controllers_1.Get("/loginwithgoogle/callback"),
        routing_controllers_1.UseBefore(passport_1.default.authenticate("google", {
            failureRedirect: config_1.BASE_URL + "/api/v1/user/loginwithgoogle"
        })),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "loginGoogleCallback", null);
    UserController = __decorate([
        routing_controllers_1.JsonController("/user")
    ], UserController);
    return UserController;
}());
exports.default = UserController;
