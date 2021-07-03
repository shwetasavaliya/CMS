import { Type } from "class-transformer";
import { IsEmail, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class UserDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    state: string;

    @IsString()
    @IsOptional()
    country: string;
}