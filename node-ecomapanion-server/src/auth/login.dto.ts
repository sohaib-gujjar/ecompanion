import { IsEmail, IsString } from "class-validator";

export default class LoginDTO {
  
  @IsEmail({}, { message: "Provided Email is not valid" })
  public email: string;

  @IsString()
  public password: string;
}