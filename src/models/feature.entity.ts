import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import { Module } from './module.entity';
import { RolePermission } from './role-permissions.entity';

@Entity('features')
export class Feature extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @ManyToOne(() => Module, (module) => module.features, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module: Module; 

  @CreateDateColumn({ type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  updated_at: Date;
}
