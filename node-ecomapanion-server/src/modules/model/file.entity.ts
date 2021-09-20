import { Entity, Column, OneToOne } from "typeorm";
import AbstractEntity from "./abstractEntity";
import Message from "./message.entity";
import { User } from "./user.entity";

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

    @OneToOne(() => Message, msg => msg.file) 
    message: Message;
}