import { IsEmail, IsString } from "class-validator";

export default class UserDTO {

    @IsString()
    public id: string;

    @IsString()
    public firstName?: string;

    @IsString()
    public lastName: string;

    @IsEmail({}, { message: "Provided Email is not valid" })
    public email: string;
}