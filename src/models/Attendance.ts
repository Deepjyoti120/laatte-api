import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Shift } from './Shift';

@Entity('attendances')
export class Attendance extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @ManyToOne(() => User, user => user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Shift, shift => shift, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'shift_id' })
    shift: Shift;

    @Column({ type: 'varchar', length: 255, nullable: true })
    status: string;
    
    @Column({ type: 'timestamp', nullable: true })
    shift_in: Date;

    @Column({ type: 'timestamp', nullable: true })
    shift_out: Date;
 
    @Column({ type: 'integer', nullable: true })
    total_minutes: number;
    
    @Column({ type: 'integer', nullable: true })
    late_by_minutes: number;

    @Column({ type: 'integer', nullable: true })
    early_by_minutes: number;

    @Column({ type: 'integer', nullable: true })
    on_time_by_minutes: number;

    @Column({ type: 'boolean', default: false })
    is_late: boolean;

    @Column({ type: 'boolean', default: false })
    is_early: boolean;

    @Column({ type: 'boolean', default: false })
    is_on_time: boolean;

    @Column({ type: 'boolean', default: false })
    is_absent: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    location: string;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    longitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    latitude: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
    
}