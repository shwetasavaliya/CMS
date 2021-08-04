import * as Mongoose from "mongoose";

export interface IParty extends Mongoose.Document {
    partyFirstName: string;
    partyMiddleName: string;
    partyLastName: string;
    partyCompanyName: string;
    partyCompanyMobile: string;
    partyMobile: string;
    partyGstNo: string;
    partyPanNo: string;
    userId?: Mongoose.Schema.Types.ObjectId;
    partyInvoiceUrl?:string,
    partyAadharCardNo: string;
    bankName: string;
    bankAccountNo: string;
    bankAccountType: string;
    bankIFSCCode: string;
    bankBranchAddress: string;
    contactPersonName: string;
    contactPersonMobile: string;
    contactPersonEmail: string;
    contactPersonAddress: string;
}