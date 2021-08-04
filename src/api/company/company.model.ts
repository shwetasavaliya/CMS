import * as Mongoose from 'mongoose';
import { ICompany } from './company.interface';
export const CompanySchema : Mongoose.Schema<ICompany> = new Mongoose.Schema(
    {
        companyName : { type: String, required: true },
        companyAddress:{type:String , required:true},
        companyMobile : { type: String, required: true, default: '', trim: true },
        companyEmail :  { type: String, required: true, lowercase: true },
        companyGstNo : {type : String , required : true ,trim:true},
        companyPanNo : {type: String , required : true}
    }
) 

export const CompanyModel = Mongoose.model<ICompany>(
    'company',
    CompanySchema
)