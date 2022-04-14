import * as Mongoose from "mongoose";

export interface IProjectMaster extends Mongoose.Document {
  projectTitle?: String;
  projectAbstract?: String;
  isFrontEnd? : Boolean;
  isBackEnd? : Boolean;
  frontLanguageId? : String;
  backLanguageId? : String;
  databaseName?: String;
  deployment?: String;
  currentStatus?: Boolean;
  startDate?: Date;
}
