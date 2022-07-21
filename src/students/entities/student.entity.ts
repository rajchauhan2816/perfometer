import { User } from './../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Relation,
  OneToMany,
} from 'typeorm';
import { StudentMark } from '../marks/entities/student-mark.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: Relation<User>;

  @Column()
  name: string;

  @Column()
  dob: string;

  @Column()
  gender: string;

  @Column({ unique: true })
  enrollmentNo: string;

  @OneToMany(() => StudentMark, (s) => s.student)
  scores: StudentMark[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
