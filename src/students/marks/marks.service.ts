import { SubjectsService } from './../../subjects/subjects.service';
import { CreateMarksDto } from './dto/create-marks.dto';
import { StudentsService } from './../students.service';
import { StudentMark } from './entities/student-mark.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(StudentMark)
    private studentSubjectsRepo: Repository<StudentMark>,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
  ) {}

  async find(userId: number) {
    const student = await this.studentsService.findOneByUserId(userId);
    const marks = await this.studentSubjectsRepo.findBy({
      student: { id: student.id },
    });
    return marks;
  }

  async create(userId: number, createMarksDto: CreateMarksDto) {
    const { subjectId, ...dto } = createMarksDto;

    const student = await this.studentsService.findOneByUserId(userId);
    const subject = await this.subjectsService.findOne(subjectId);

    const mark = await this.studentSubjectsRepo.findOneBy({
      student: { id: student.id },
      subject: { id: subject.id },
    });

    if (mark) {
      throw new Error('Student already has this subject');
    }

    const newMark = await this.studentSubjectsRepo.save({
      ...dto,
      student,
      subject,
    });

    return newMark;
  }
}
