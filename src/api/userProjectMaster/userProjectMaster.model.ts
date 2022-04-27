import { time } from "console";
import * as Mongoose from "mongoose";
import { IUserProject } from "./userProjectMaster.interface";

export const UserProjectSchema: Mongoose.Schema<IUserProject> = new Mongoose.Schema({
    projectId : { type:Mongoose.Schema.Types.ObjectId,ref:"projectMaster" },
    userId : { type:Mongoose.Schema.Types.ObjectId,ref:"user"},
    adminId : { type:Mongoose.Schema.Types.ObjectId,ref:"user"},
    createdAt : { type:Date,default:Date.now() }
});

export const  UserProjectModel = Mongoose.model<IUserProject>("userProject",UserProjectSchema);