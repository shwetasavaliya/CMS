import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  ValidateNested,
  isString,
  IsArray
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

export class getuserDTO{
  @IsString()
  adminId: string;
}

export class assignRole{
  @IsString()
  userId: string;

  @IsString()
  projectId: string;

  @IsArray()
  roleId: Array<string>
}
