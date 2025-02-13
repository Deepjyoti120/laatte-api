import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Designation } from './designation.entity';

@Entity('departments')
export class Department extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'head_id' })
    head: User;

    @OneToMany(() => Designation, designation => designation.department)
    designations: Designation[];

    @OneToMany(() => User, user => user.department)
    users: User[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}