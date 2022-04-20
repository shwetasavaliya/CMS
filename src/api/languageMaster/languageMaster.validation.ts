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
    isFrontEnd: boolean;

    @IsBoolean()
    isBackEnd: boolean;

    @IsString()
    language: string;
  }

  export class UpdateLanguageDTO {
    @IsBoolean()
    @IsOptional()
    isFrontEnd: boolean;

    @IsBoolean()
    @IsOptional()
    isBackEnd: boolean;

    @IsString()
    @IsOptional()
    language: string;
  }