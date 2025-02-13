import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('generated_salaries')
export class GeneratedSalary extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 255, default: 'pending'})
  status: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  base_salary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  bonus: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deductions: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  net_salary: number;

  @Column({ type: 'date', nullable: true })
  effective_date: Date;

  @Column({ type: 'int', nullable: false }) 
  salary_month: number;

  @Column({ type: 'int', nullable: false }) 
  salary_year: number; 

  // @ManyToOne(() => User, { nullable: true })
  // @JoinColumn({ name: 'generated_by' })
  // generated_by: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
