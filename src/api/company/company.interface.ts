import * as Mongoose from 'mongoose';
export interface ICompany extends Mongoose.Document{
    companyName :string;
    companyAddress:string;
    companyMobile:string;
    companyEmail:string;
    companyGstNo:string;
    companyPanNo:string
}
