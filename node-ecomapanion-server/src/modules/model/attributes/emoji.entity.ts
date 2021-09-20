import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "../abstractEntity";
import Reaction from "./reactions.entity";

@Entity()
export default class Emoji extends AbstractEntity {

    @Column()
    name: string;

    @Column()
    code: string;

    @OneToMany(() => Reaction, reaction => reaction.emoji) 
    reaction: Reaction[];
}