import { time } from "console";
import * as Mongoose from "mongoose";
import { IUserJoin } from "./userJoinMaster.interface";

export const joinMasterSchema: Mongoose.Schema<IUserJoin> = new Mongoose.Schema({
  firstname :{ type:String,required:true },
  lastname : { type:String,required:true },
  email : { type:String,required:true,lowercase:true },
  password: { type:String,required:true }
});

// async function hashIt() {
//     const salt = await bcrypt.genSalt(10,hashIt)
// }
// hashIt();
export const UserJoinModel = Mongoose.model<IUserJoin>("joinuser", joinMasterSchema);
