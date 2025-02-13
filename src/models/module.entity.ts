import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import { Feature } from './feature.entity';
import { RolePermission } from './role-permissions.entity';

@Entity('modules')
export class Module extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => Feature, (feature) => feature.module)
  features: Feature[];

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string; 

  @CreateDateColumn({ type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  updated_at: Date;
}
