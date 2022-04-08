import {
    IsEmail,
    IsObject,
    IsOptional,
    IsString,
    IsBoolean,
    IsNumber,
    IsArray,
    ValidateNested,
  } from "class-validator";
  
  export class LanguageDTO {
    @IsBoolean()
    isFrontEnd: Boolean;

    @IsBoolean()
    isBackEnd: Boolean;

    @IsString()
    language: String;
  }