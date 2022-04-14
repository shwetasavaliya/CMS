import {
    IsEmail,
    IsObject,
    IsOptional,
    IsString,
    IsNumber,
    ValidateNested,
  } from "class-validator";

  export class joinUserDTO {
      @IsString()
      firstname : String;

      @IsString()
      lastname : String;

      @IsEmail()
      email : String;

      @IsString()
      password: String;
  }