import { Subject } from '../../../subjects/entities/subject.entity';
import { Student } from '../../entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class StudentMark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @ManyToOne(() => Student)
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Subject)
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
