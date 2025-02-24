import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('photos')
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.photos, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
