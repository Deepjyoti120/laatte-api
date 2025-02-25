import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { PromptComment } from './prompt_comment.entity';
import { Photo } from './photo.entity';

@Entity('prompts')
export class Prompt extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'text', nullable: true })
  prompt: string;

  @Column({ type: 'text', nullable: true })
  bg_picture: string;

  @ManyToOne(() => Photo, p => p, { onDelete: 'CASCADE', nullable: true, eager: true })
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;

  @Column({ type: 'int', default: 0 })
  comment_count: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PromptComment, (comment) => comment.prompt, {eager: true})
  comments: PromptComment[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}
