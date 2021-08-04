import * as Mongoose from "mongoose";
import { IUser } from "./user.interface";

export const UsersSchema: Mongoose.Schema<IUser> = new Mongoose.Schema({
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
  resetPasswordToken : { type: String, default: null},
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
export const UserModel = Mongoose.model<IUser>("user", UsersSchema);
