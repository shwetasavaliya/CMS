import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class CompanyDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  mobile: string;

  @IsString()
  gstNo: string;

  @IsString()
  panNo: string;
}

export class CompanyUpadteDTO {
  @IsEmail()
  @IsOptional()
  companyEmail: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  companyAddress: string;

  @IsString()
  @IsOptional()
  companyMobile: string;

  @IsString()
  @IsOptional()
  companyGstNo: string;

  @IsString()
  @IsOptional()
  companyPanNo: string;
}
