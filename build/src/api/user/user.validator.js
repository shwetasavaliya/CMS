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
exports.UserDTO = void 0;
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
    ], UserDTO.prototype, "lastName", void 0);
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
    return UserDTO;
}());
exports.UserDTO = UserDTO;
