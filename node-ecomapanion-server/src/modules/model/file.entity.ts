import { Entity, Column, OneToOne } from "typeorm";
import AbstractEntity from "./abstractEntity";
import { User } from "./user/user.entity";
@Entity()
export default class File extends AbstractEntity {
    @Column()
    name: string;
    @Column()
    path: string;
    @Column()
    type: string;
    @OneToOne(() => User, user => user.img) 
    user: User;
}