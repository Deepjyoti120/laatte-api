import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity('chats')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.chats1)
  @JoinColumn({ name: 'user1_id' })
  user1: User;

  @ManyToOne(() => User, user => user.chats2)
  @JoinColumn({ name: 'user2_id' })
  user2: User;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
