import { time } from "console";
import * as Mongoose from "mongoose";
import { IUser } from "./user.interface";

export const UsersSchema: Mongoose.Schema<IUser> = new Mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  role:{ type: String, required: true},
  phoneNo: { type: Number, required: true },
  adminId: { type: String},
  token: { type: String },
  OTP: { type: String }
});

// async function hashIt() {
//     const salt = await bcrypt.genSalt(10,hashIt)
// }
// hashIt();
export const UserModel = Mongoose.model<IUser>("registration", UsersSchema);
