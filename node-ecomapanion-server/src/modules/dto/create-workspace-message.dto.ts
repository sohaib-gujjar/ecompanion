import { IsNotEmpty, IsString } from "class-validator";
import UserDTO from "./user.dto";


class WorkspaceDTO {

    @IsString()
    public id?: string;

    @IsNotEmpty()
    public name: string;
}

export default class CreateWorkSpaceMessageDTO {


    @IsString()
    public text?: string;

    @IsNotEmpty()
    public workspace: WorkspaceDTO;

    @IsNotEmpty()
    public user: UserDTO;
}