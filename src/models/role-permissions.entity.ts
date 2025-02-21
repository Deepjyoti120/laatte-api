import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Feature } from './feature.entity';
import { Module } from './module.entity';
import { Role } from '../shared/enums/role.enums';

@Entity('role_permissions')
export class RolePermission extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: Role, nullable: true, default: Role.USER })
    role: Role;

    @ManyToOne(() => Module, (module) => module.features, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'module_id' })
    module: Module;

    @ManyToOne(() => Feature, { nullable: true , onDelete: 'CASCADE', onUpdate: 'CASCADE', eager:true })
    @JoinColumn({ name: 'feature_id' })
    feature: Feature; 
}