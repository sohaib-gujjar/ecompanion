import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "../abstractEntity";
import Message from "../message.entity";
import Emoji from "./emoji.entity";

@Entity()
export default class Reaction extends AbstractEntity {

    @ManyToOne(() => Emoji, emoji => emoji.reaction)
    @JoinColumn()
    emoji: Emoji;

    @OneToOne(() => Message, msg => msg.reaction) 
    message: Message;
}