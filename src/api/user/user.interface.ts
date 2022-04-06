import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  userName?: String;
  email?: String;
  password?: String;
  phoneNo?: Number;
  OTP?: String;
}
