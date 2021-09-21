import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { IsEmail, MaxLength, IsNotEmpty } from 'class-validator';
import AbstractEntity from "./abstractEntity";
import File from "./file.entity";
import Message from "./message.entity";
import Workspace from "./workspace.entity";

@Entity()
export class User extends AbstractEntity {
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({ length: 254, unique: true })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(254)
    email: string = undefined;
    
    @Column("text")
    @IsNotEmpty()
    @MaxLength(500)
    description: string;

    @Column()
    password: string;
    
    @OneToOne(() => File, img => img.user)
    @JoinColumn()
    img: File;


    @OneToMany(() => Message, messages => messages.user)
    messages: Message[];

    @OneToMany(() => Message, messages => messages.toUser)
    receivedMessages: Message[];

    @ManyToMany(() => Workspace, ws => ws.users)
    workspace: Workspace[];
}