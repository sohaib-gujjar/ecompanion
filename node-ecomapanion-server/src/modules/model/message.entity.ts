import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstractEntity";
import Reaction from "./attributes/reactions.entity";
import File from "./file.entity";
import { User } from "./user.entity";


@Entity()
export default class Message extends AbstractEntity {

    @Column()
    text: string;


    @ManyToOne(type => Message, reply => reply.reply)
    message: Message;

    @OneToMany(type => Message, message => message.message)
    reply: Message[];


    @OneToOne(() => File, file => file.message)
    @JoinColumn()
    file: File;


    @ManyToOne(() => User, user => user.messages)
    user: User;

    @OneToOne(() => Reaction, reaction => reaction.message)
    reaction: Reaction;
    
}