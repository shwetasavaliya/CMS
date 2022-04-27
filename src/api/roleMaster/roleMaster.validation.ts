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
    roleName: string;

    @IsString()
    description: string;
}

export class roleUpdateDTO{
  @IsString()
  @IsOptional()
  roleName: string;

  @IsString()
  @IsOptional()
  description: string;
}