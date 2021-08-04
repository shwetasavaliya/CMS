"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordDTO = exports.ForgotPasswordDTO = exports.OtpDTO = exports.ChechEmailDTO = exports.UpdateDTO = exports.LoginDTO = exports.UserDTO = void 0;
var class_validator_1 = require("class-validator");
var UserDTO = /** @class */ (function () {
    function UserDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "password", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "firstName", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "middleName", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "lastName", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "userName", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "phone", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "city", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "state", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "country", void 0);
    __decorate([
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "companyEmail", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "companyName", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "companyAddress", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "companyMobile", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "companyGstNo", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], UserDTO.prototype, "companyPanNo", void 0);
    return UserDTO;
}());
exports.UserDTO = UserDTO;
var LoginDTO = /** @class */ (function () {
    function LoginDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "userName", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "password", void 0);
    return LoginDTO;
}());
exports.LoginDTO = LoginDTO;
var UpdateDTO = /** @class */ (function () {
    function UpdateDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateDTO.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateDTO.prototype, "firstName", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateDTO.prototype, "middleName", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateDTO.prototype, "lastName", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateDTO.prototype, "userName", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateDTO.prototype, "fileName", void 0);
    return UpdateDTO;
}());
exports.UpdateDTO = UpdateDTO;
var ChechEmailDTO = /** @class */ (function () {
    function ChechEmailDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], ChechEmailDTO.prototype, "email", void 0);
    return ChechEmailDTO;
}());
exports.ChechEmailDTO = ChechEmailDTO;
var OtpDTO = /** @class */ (function () {
    function OtpDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], OtpDTO.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], OtpDTO.prototype, "otp", void 0);
    return OtpDTO;
}());
exports.OtpDTO = OtpDTO;
var ForgotPasswordDTO = /** @class */ (function () {
    function ForgotPasswordDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], ForgotPasswordDTO.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], ForgotPasswordDTO.prototype, "password", void 0);
    return ForgotPasswordDTO;
}());
exports.ForgotPasswordDTO = ForgotPasswordDTO;
var ChangePasswordDTO = /** @class */ (function () {
    function ChangePasswordDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], ChangePasswordDTO.prototype, "oldPassword", void 0);
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], ChangePasswordDTO.prototype, "newPassword", void 0);
    return ChangePasswordDTO;
}());
exports.ChangePasswordDTO = ChangePasswordDTO;
