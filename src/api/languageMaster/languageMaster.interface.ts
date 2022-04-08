import * as Mongoose from "mongoose";

export interface ILanguageMaster extends Mongoose.Document {
  isFrontEnd? : Boolean;
  isBackEnd? : Boolean;
  language? : String;
}

