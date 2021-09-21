import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstractEntity";
import Reaction from "./attributes/reactions.entity";
import File from "./file.entity";
import Teams from "./team.entity";
import { User } from "./user.entity";
import Workspace from "./workspace.entity";


@Entity()
export default class Message extends AbstractEntity {

    @Column({ type: "text"})
    text: string;


    /*@ManyToOne(type => Message, reply => reply.reply)
    message: Message;

    @OneToMany(type => Message, message => message.message)
    reply: Message[];*/


    @OneToOne(() => File, file => file.message)
    @JoinColumn()
    file: File;


    @ManyToOne(() => User, user => user.messages, { nullable: false })
    user: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    toUser: User;

    @ManyToOne(() => Workspace, ws => ws.message)
    workspaceMessage: Workspace;

    @ManyToOne(() => Teams)
    teamsMessage: Teams;

    @OneToOne(() => Reaction, reaction => reaction.message)
    reaction: Reaction;
    
}