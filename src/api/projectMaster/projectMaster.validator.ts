import { Boolean } from "aws-sdk/clients/apigateway";
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

export class ProjectDTO {
  @IsString()
  projectTitle: string;

  @IsString()
  projectAbstract: string;

  @IsBoolean()
  isFrontEnd: boolean;

  @IsBoolean()
  isBackEnd: boolean;

  @IsArray()
  @IsOptional()
  frontLanguageId: string;

  @IsArray()
  @IsOptional()
  backLanguageId: string;

  @IsString()
  databaseName: string;

  @IsString()
  deployment: string;

  @IsBoolean()
  currentStatus: boolean;

  @IsString()
  startDate: string;
}

export class UpdateProjectDTO{
  @IsString()
  @IsOptional()
  projectTitle: string;

  @IsString()
  @IsOptional()
  projectAbstract: string;

  @IsBoolean()
  @IsOptional()
  isFrontEnd: boolean;

  @IsBoolean()
  @IsOptional()
  isBackEnd: boolean;

  @IsArray()
  @IsOptional()
  frontLanguageId: string;

  @IsArray()
  @IsOptional()
  backLanguageId: string;

  @IsString()
  @IsOptional()
  databaseName: string;

  @IsString()
  @IsOptional()
  deployment: string;

  @IsBoolean()
  @IsOptional()
  currentStatus: boolean;

  @IsString()
  @IsOptional()
  startDate: string;
}