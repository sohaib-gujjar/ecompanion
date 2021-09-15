import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
export default class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    //@CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
    @Column({ default: () => "NOW()" })
    createdAt: Date;
    //@UpdateDateColumn({ type: 'timestamp', nullable: true, default: null,  onUpdate: "CURRENT_TIMESTAMP(6)" })
    @Column({ nullable: true })
    updatedAt: Date;
}