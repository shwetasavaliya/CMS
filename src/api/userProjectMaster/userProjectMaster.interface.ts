import * as Mongoose from "mongoose";

export interface IUserProject extends Mongoose.Document {
    projectId?: String;
    userId?: String;
    adminId?:String;
    role?:Array<String>
  }
  