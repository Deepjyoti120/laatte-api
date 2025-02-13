import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Department } from './department.entity';

@Entity('designations')
export class Designation extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => User, user => user.designation)
    users: User[];

    @ManyToOne(() => Department, department => department.designations, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}