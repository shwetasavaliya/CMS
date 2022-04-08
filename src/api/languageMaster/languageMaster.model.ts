import { time } from "console";
import * as Mongoose from "mongoose";
import { ILanguageMaster } from './languageMaster.interface';


export const LanguageMasterSchema: Mongoose.Schema<ILanguageMaster> = new Mongoose.Schema({
    isFrontEnd: { type:Boolean  },
    isBackEnd: { type:Boolean  },
    language: { type: String , required:true},
    createdAt:{ type:Date, default: Date.now()},
    createdBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" },
    updatedAt:{ type:Date, default: Date.now() },
    updatedBy:{ type:Mongoose.Schema.Types.ObjectId , ref:"registration" , default:null}
  });

  export const LanguageMasterModel = Mongoose.model<ILanguageMaster>("languageMaster", LanguageMasterSchema);