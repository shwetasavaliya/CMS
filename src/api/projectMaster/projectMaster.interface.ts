import * as Mongoose from "mongoose";

export interface IProjectMaster extends Mongoose.Document {
  projectTitle?: String;
  projectAbstract?: String;
  technology?: String;
  language?: String;
  databaseName?: String;
  deployment?: String;
  currentStatus?: Boolean;
  startDate?: Date;
}
