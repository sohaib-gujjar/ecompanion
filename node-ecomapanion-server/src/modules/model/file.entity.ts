import { Entity, Column, OneToOne } from "typeorm";
import AbstractEntity from "./abstractEntity";
import Message from "./message.entity";
import { User } from "./user.entity";

@Entity()
export default class File extends AbstractEntity {
    @Column({ nullable: true})
    originalname: string;

    @Column()
    filename: string;

    @Column({ nullable: true})
    mimetype: string;

    @Column()
    path: string;

    @Column({ nullable: true})
    destination: string;

    @Column({ nullable: true})
    ext: string;

    @Column({ nullable: true})
    size: number;

    @OneToOne(() => User, user => user.img) 
    user: User;

    @OneToOne(() => Message, msg => msg.file) 
    message: Message;
}