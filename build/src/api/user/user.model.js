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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UsersSchema = void 0;
var Mongoose = __importStar(require("mongoose"));
exports.UsersSchema = new Mongoose.Schema({
    email: { type: String, required: false, lowercase: true },
    password: { type: String, required: false },
    firstName: { type: String, required: false },
    middleName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: false, unique: false },
    accessToken: { type: String, required: false },
    tokenCreatedAtTime: { type: Number, default: 0, required: true },
    tokenUpdatedAtTime: { type: Number, default: 0, required: true },
    companyId: { type: Mongoose.Schema.Types.ObjectId, ref: "company" },
    profilePictures: {
        orignal: { type: String, default: "" },
        thumb: { type: String, default: "" },
    },
    phone: {
        type: String,
        required: false,
        default: "",
        trim: true,
        unique: true,
    },
    otp: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    city: { type: String, required: false, default: "" },
    state: { type: String, required: false, default: "" },
    country: { type: String, required: false, default: "" },
    isEmailVerified: { type: Boolean, required: true, default: false },
    isPhoneVerified: { type: Boolean, required: true, default: false },
    language: { type: String, enum: ["ENGLISH"], default: "ENGLISH" },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    localCreatedAt: { type: Number },
});
// async function hashIt() {
//     const salt = await bcrypt.genSalt(10,hashIt)
// }
// hashIt();
exports.UserModel = Mongoose.model("user", exports.UsersSchema);
