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

  export class UpdateLanguageDTO {
    @IsBoolean()
    @IsOptional()
    isFrontEnd: Boolean;

    @IsBoolean()
    @IsOptional()
    isBackEnd: Boolean;

    @IsString()
    @IsOptional()
    language: String;
  }