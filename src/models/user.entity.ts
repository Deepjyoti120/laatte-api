import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique, Check } from 'typeorm';
import { Role } from '../shared/enums/role.enums';
import { GenderType } from '../shared/enums/gender-type.enums';
import { Photo } from './photo.entity';
import { Chat } from './chat.entity';

@Entity('users')
@Unique(['country_code', 'phone'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_profile_done: boolean;

  @Column({ type: 'int', default: 60 })
  radius: number;

  @Column({ type: 'enum', enum: Role, nullable: true, default: Role.USER })
  role: Role;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  // device_name
  @Column({ type: 'varchar', length: 255, nullable: true })
  device_name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  username: string;
  // @Column({ type: 'bigint', unique: true, default: () => `nextval('username_seq')` })
  // username: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_picture: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bio: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assign_to' })
  assign_to: User;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'int', nullable: true })
  verification_token: number;

  @Column({ type: 'bigint', nullable: true })
  verification_token_time: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  occupation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  education: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  middle_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 5, default: '+91' })
  country_code: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: GenderType, nullable: true, default: GenderType.NONE })
  gender: GenderType;

  @Column({ type: 'date', nullable: true })
  doj: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pincode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // state: string;

  // @Column({ type: 'varchar', length: 255, nullable: true, default: 'India' })
  // country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emergency_contact: string;

  @Column({ type: 'text', nullable: true })
  fcm_token: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'int', nullable: true })
  @Check("otp >= 100000 AND otp <= 999999")
  otp: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  // toJSON() {
  //   const { password, verification_token, verification_token_time, ...user } = this;
  //   return user;
  // }
  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];

  @OneToMany(() => Chat, chat => chat.user1)
  chats1: Chat[];

  @OneToMany(() => Chat, chat => chat.user2)
  chats2: Chat[];


  toJSON() {
    const { password, verification_token, verification_token_time, ...user } = this;
    // const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    // user.profile_picture = user.profile_picture
    //   ? `${baseUrl}/${user.profile_picture}`
    //   : "https://cdn-icons-png.flaticon.com/512/9203/9203764.png";
    user.profile_picture = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${user.profile_picture}`;
    return user;
  }

}
