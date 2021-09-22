import { IsEmail, IsString, IsNotEmpty} from "class-validator";
import UserDTO from "./user.dto";

export default class CreateUserMessageDTO {

    @IsString()
    public text: string;

    @IsNotEmpty()
    public sender?: UserDTO;

    @IsNotEmpty()
    public receiver: UserDTO;
}