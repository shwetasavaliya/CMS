import { time } from "console";
import * as Mongoose from "mongoose";
import { IRole } from "./roleMaster.interface";

export const RolesSchema: Mongoose.Schema<IRole> = new Mongoose.Schema({
  roleName : { type: String , required:true },
  description: { type: String },
  createdAt:{ type:Date, default: Date.now()},
  createdBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" },
  updatedAt:{ type:Date, default: Date.now() },
  updatedBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" , default:null}
});

// async function hashIt() {
//     const salt = await bcrypt.genSalt(10,hashIt)
// }
// hashIt();
export const RoleModel = Mongoose.model<IRole>("roleMaster", RolesSchema);

