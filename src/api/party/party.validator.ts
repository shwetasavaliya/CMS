import {
    IsOptional,
    IsString,
    IsEmail
} from "class-validator";

export class PartyDTO {
    @IsString()
    partyFirstName: string;

    @IsString()
    partyMiddleName: string;

    @IsString()
    partyLastName: string;

    @IsString()
    partyCompanyName: string;

    @IsString()
    partyMobile: string;

    @IsString()
    partyCompanyMobile: string;

    @IsString()
    partyGstNo: string;

    @IsString()
    partyPanNo: string;

    @IsString()
    partyAadharCardNo: string;

    @IsString()
    bankName: string;

    @IsString()
    bankAccountNo: string;

    @IsString()
    bankAccountType: string;

    @IsString()
    bankIFSCCode: string;

    @IsString()
    bankBranchAddress: string;

    @IsString()
    contactPersonName: string;

    @IsString()
    contactPersonMobile: string;

    @IsEmail()
    contactPersonEmail: string;

    @IsString()
    contactPersonAddress: string;
}

export class PartyUpdateDTO {

    @IsString()
    _id: string

    @IsString()
    @IsOptional()
    partyFirstName: string;

    @IsString()
    @IsOptional()
    partyMiddleName: string;

    @IsString()
    @IsOptional()
    partyLastName: string;

    @IsString()
    @IsOptional()
    partyCompanyName: string;

    @IsString()
    @IsOptional()
    partyMobile: string;

    @IsString()
    @IsOptional()
    partyCompanyMobile: string;

    @IsString()
    @IsOptional()
    partyGstNo: string;

    @IsString()
    @IsOptional()
    partyPanNo: string;

    @IsString()
    @IsOptional()
    partyAadharCardNo: string;

    @IsString()
    @IsOptional()
    bankName: string;

    @IsString()
    @IsOptional()
    bankAccountNo: string;

    @IsString()
    @IsOptional()
    bankAccountType: string;

    @IsString()
    @IsOptional()
    bankIFSCCode: string;

    @IsString()
    @IsOptional()
    bankBranchAddress: string;

    @IsString()
    @IsOptional()
    contactPersonName: string;

    @IsString()
    @IsOptional()
    contactPersonMobile: string;

    @IsEmail()
    @IsOptional()
    contactPersonEmail: string;

    @IsString()
    @IsOptional()
    contactPersonAddress: string;
}

export class PartyDeleteDTO {
    @IsString()
    _id: string
}