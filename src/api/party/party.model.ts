import * as Mongoose from "mongoose";
import { IParty } from "./party.interface";

export const PartySchema: Mongoose.Schema<IParty> = new Mongoose.Schema({
    userId: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    partyInvoiceUrl: { type: String , default : null},
    partyFirstName: { type: String, required: true },
    partyMiddleName: { type: String, required: true },
    partyLastName: { type: String, required: true },
    partyCompanyName: { type: String, required: true },
    partyMobile: { type: String, required: true, lowercase: true },
    partyCompanyMobile: { type: String, required: true },
    partyGstNo: { type: String, required: true, trim: true },
    partyPanNo: { type: String, required: true },
    bankName: { type: String, required: true },
    partyAadharCardNo: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
    bankAccountType: { type: String, required: true },
    bankIFSCCode: { type: String, required: true },
    bankBranchAddress: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contactPersonMobile: { type: String, required: true },
    contactPersonEmail: { type: String, required: true, lowercase: true },
    contactPersonAddress: { type: String, required: true },
})

export const PartyModel = Mongoose.model<IParty>('party', PartySchema)