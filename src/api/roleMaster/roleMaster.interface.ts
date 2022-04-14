import * as Mongoose from "mongoose";

export interface IRole extends Mongoose.Document {
  roleName?: String;
  description?: String;
}
