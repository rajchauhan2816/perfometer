import { Subject } from './../../subjects/entities/subject.entity';
import { Student } from './student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class StudentSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @OneToOne(() => Student)
  @JoinColumn()
  student: Student;

  @OneToOne(() => Subject)
  @JoinColumn()
  subject: Subject;

  @Column()
  maxMarks: number;

  @Column()
  marks: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
