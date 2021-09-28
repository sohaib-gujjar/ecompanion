import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import AbstractEntity from "./abstractEntity";
import { User } from "./user.entity";
import Workspace from "./workspace.entity";


@Entity()
export default class Teams extends AbstractEntity {

    @Column()
    name: string;


    @ManyToOne(() => Workspace, workspace => workspace.teams)
    workspace: Workspace;


    @ManyToMany(() => User, user => user.teams, { cascade: true })
    @JoinTable()
    users: User[];
    
}