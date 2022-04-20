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

  @IsString()
  @IsOptional()
  adminId: string;
}

export class UserEmailDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class sendUserJoinDTO{
  @IsEmail()
  email: string;

  @IsString()
  userId: string;
}

export class OtpSendDTO {
  @IsEmail()
  email: string;
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
