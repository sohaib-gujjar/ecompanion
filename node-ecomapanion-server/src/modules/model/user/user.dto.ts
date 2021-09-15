import { IsEmail, IsString, MinLength } from "class-validator";

export default class CreateUserDto {
  
  @IsString()
  public firstName?: string;

  @IsString()
  public lastName: string;

  @IsEmail({}, { message: "Provided Email is not valid" })
  public email: string;

  @IsString()
  @MinLength(8, { message: "Password should be minimum of 8 characters" })
  public password: string;

  @IsString()
  public description: string;
}