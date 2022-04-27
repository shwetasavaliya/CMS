import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  userName?: String;
  email?: String;
  password?: String;
  role?: String;
  phoneNo?: Number;
  adminId?: String;
  token?: String;
  OTP?: String; 
}
