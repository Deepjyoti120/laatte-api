import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Prompt } from './prompt.entity';

@Entity('match_prompts')
export class MatchPrompt extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Prompt, prompt => prompt, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prompt_id' })
  prompt: Prompt;

  // @Column({ type: 'enum', enum: ['right', 'left'], nullable: false })
  // action: 'right' | 'left';

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
