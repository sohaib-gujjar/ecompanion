import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import AbstractEntity from "./abstractEntity";
import Teams from "./team.entity";
import { User } from "./user.entity";


@Entity()
export default class Workspace extends AbstractEntity {

    @Column()
    name: string;

    @OneToMany(() => Teams, teams => teams.workspace)
    teams: Teams[];


    @ManyToMany(() => User, { cascade: true })
    @JoinTable()
    users: User[];
}