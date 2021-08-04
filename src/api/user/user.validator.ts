import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class UserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsEmail()
  companyEmail: string;

  @IsString()
  companyName: string;

  @IsString()
  companyAddress: string;

  @IsString()
  companyMobile: string;

  @IsString()
  companyGstNo: string;

  @IsString()
  companyPanNo: string;
}

export class LoginDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  password: string;
}

export class UpdateDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  fileName: string;
  /*
    @IsEmail()
    @IsOptional()
    companyEmail:string

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
    */
}
export class ChechEmailDTO {
  @IsEmail()
  email: string;
}

export class OtpDTO {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}

export class ForgotPasswordDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ChangePasswordDTO {
  
  @IsString()
  oldPassword:string;
  
  @IsString()
  newPassword: string;
}
