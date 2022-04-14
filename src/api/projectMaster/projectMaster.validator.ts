import { Boolean } from "aws-sdk/clients/apigateway";
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  ValidateNested,
} from "class-validator";

export class ProjectDTO {
  @IsString()
  projectTitle: String;

  @IsString()
  projectAbstract: String;

  @IsBoolean()
  isFrontEnd: Boolean;

  @IsBoolean()
  isBackEnd: Boolean;

  @IsString()
  @IsOptional()
  frontLanguageId: String;

  @IsString()
  @IsOptional()
  backLanguageId: String;

  @IsString()
  databaseName: String;

  @IsString()
  deployment: String;

  @IsBoolean()
  currentStatus: Boolean;

  @IsString()
  startDate: String;
}

export class UpdateProjectDTO{
  @IsString()
  @IsOptional()
  projectTitle: String;

  @IsString()
  @IsOptional()
  projectAbstract: String;

  @IsBoolean()
  @IsOptional()
  isFrontEnd: Boolean;

  @IsBoolean()
  @IsOptional()
  isBackEnd: Boolean;

  @IsString()
  @IsOptional()
  frontLanguageId: String;

  @IsString()
  @IsOptional()
  backLanguageId: String;

  @IsString()
  @IsOptional()
  databaseName: String;

  @IsString()
  @IsOptional()
  deployment: String;

  @IsBoolean()
  @IsOptional()
  currentStatus: Boolean;

  @IsString()
  @IsOptional()
  startDate: String;
}