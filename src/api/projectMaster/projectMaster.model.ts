import { time } from "console";
import * as Mongoose from "mongoose";
import { IProjectMaster } from "./projectMaster.interface";

export const ProjectMasterSchema: Mongoose.Schema<IProjectMaster> = new Mongoose.Schema({
    projectTitle: { type: String, required: true },
    projectAbstract: { type: String, required: true},
    technology: { type: String, required: true },
    language: { type: String, required: true },
    databaseName: { type: String, required: true },
    deployment: { type: String, required: true },
    currentStatus: { type:Boolean, required: true , default:true },
    startDate: { type:Date, required: true},
    createdAt:{ type:Date, default: Date.now()},
    createdBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" },
    updatedAt:{ type:Date, default: Date.now() },
    updatedBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" , default:null}
});


// async function hashIt() {
//     const salt = await bcrypt.genSalt(10,hashIt)
// }
// hashIt();
export const ProjectMasterModel = Mongoose.model<IProjectMaster>("projectMaster", ProjectMasterSchema);
