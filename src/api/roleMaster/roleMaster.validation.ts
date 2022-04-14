import { Boolean } from "aws-sdk/clients/apigateway";
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  ValidateNested,
  isString,
} from "class-validator";

export class roleDTO{
    @IsString()
    roleName: String;

    @IsString()
    description: String;
}

export class roleUpdateDTO{
  @IsString()
  @IsOptional()
  roleName: String;

  @IsString()
  @IsOptional()
  description: String;
}