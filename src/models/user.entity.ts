import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm';
import { Document } from './Document';
import { FinancialDetail } from './FinancialDetail';
import { Role } from '../shared/enums/role.enums';
import { GenderType } from '../shared/enums/gender-type.enums';
import { Department } from './department.entity';
import { Designation } from './designation.entity';
import { Country } from './Country.entity';
import { State } from './State.entity';

@Entity('users')
@Unique(['country_code', 'phone'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'enum', enum: Role, nullable: true, default: Role.EMPLOYEE })
  role: Role;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
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
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  middle_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 5, default: '+91' })
  country_code: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  // @Column({ type: 'varchar', length: 100, nullable: true })
  // designation: string;

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // department: string;
  @ManyToOne(() => Department, department => department.users, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Designation, designation => designation.users, { nullable: true, eager: true })
  @JoinColumn({ name: 'designation_id' })
  designation: Designation;

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
  @ManyToOne(() => Country, country => country.users, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne(() => State, state => state.users, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emergency_contact: string;

  @OneToMany(() => Document, documents => documents.user)
  documents: Document[];

  @OneToOne(() => FinancialDetail, financialDetail => financialDetail.user)
  financial_detail: FinancialDetail;

  @Column({ type: 'text', nullable: true })
  fcm_token: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // toJSON() {
  //   const { password, verification_token, verification_token_time, ...user } = this;
  //   return user;
  // }
  toJSON() {
    const { password, verification_token, verification_token_time, ...user } = this;
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    user.profile_picture = user.profile_picture 
        ? `${baseUrl}/${user.profile_picture}`
        : "https://cdn-icons-png.flaticon.com/512/9203/9203764.png";
    return user;
  }

}
