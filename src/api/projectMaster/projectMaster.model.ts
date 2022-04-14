import { time } from "console";
import * as Mongoose from "mongoose";
import { IProjectMaster } from "./projectMaster.interface";

export const ProjectMasterSchema: Mongoose.Schema<IProjectMaster> = new Mongoose.Schema({
    projectTitle: { type: String, required: true },
    projectAbstract: { type: String, required: true},
    isFrontEnd: { type:Boolean },
    isBackEnd: { type:Boolean },
    frontLanguageId:{ type:Mongoose.Schema.Types.ObjectId },
    backLanguageId: { type:Mongoose.Schema.Types.ObjectId },
    databaseName: { type: String, required: true },
    deployment: { type: String, required: true },
    currentStatus: { type:Boolean, required: true , default:true },
    startDate: { type:Date, required: true},
    createdAt:{ type:Date, default: Date.now()},
    createdBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" },
    updatedAt:{ type:Date, default: Date.now() },
    updatedBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" , default:null}
});
export const ProjectMasterModel = Mongoose.model<IProjectMaster>("projectMaster", ProjectMasterSchema);
