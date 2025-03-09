import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Prompt } from './prompt.entity';
import { User } from './user.entity';

@Entity('prompt_comments')
export class PromptComment extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Prompt, (prompt) => prompt.comments, { onDelete: 'CASCADE'})
  prompt: Prompt;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
