import { IsOptional, IsString } from "class-validator";

export default class CreateWorkspaceDTO {

    @IsString()
    @IsOptional()
    public id: string;

    @IsString()
    public name?: string;
}