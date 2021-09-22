import { IsNotEmpty, IsString } from "class-validator";
import UserDTO from "./user.dto";


class TeamsDTO {

    @IsString()
    public id?: string;

    @IsNotEmpty()
    public name: string;
}

export default class CreateTeamsMessageDTO {


    @IsString()
    public text?: string;

    @IsNotEmpty()
    public teams: TeamsDTO;

    @IsNotEmpty()
    public user: UserDTO;
}