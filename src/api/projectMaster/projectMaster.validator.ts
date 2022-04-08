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

  @IsString()
  technology: String;

  @IsString()
  language: String

  @IsString()
  databaseName: String;

  @IsString()
  deployment: String;

  @IsBoolean()
  currentStatus: Boolean;

  @IsString()
  startDate: String;
}