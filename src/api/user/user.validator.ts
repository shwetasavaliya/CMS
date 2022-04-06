import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from "class-validator";

export class UserDTO {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  phoneNo: number;
}

export class UserEmailDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class OtpSendDTO {
  @IsEmail()
  email: String;
}

export class matchOtpDTO {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}

export class resetPasswordDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
