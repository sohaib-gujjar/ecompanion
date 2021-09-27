import { IsOptional, IsString } from "class-validator";
import CreateWorkspaceDTO from "./create-work-space.dto";

export default class CreateTeamsDTO {

    @IsString()
    @IsOptional()
    public id: string;

    @IsString()
    public name?: string;

    public workspace: CreateWorkspaceDTO;
}