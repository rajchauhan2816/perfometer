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
    private studentMarksRepo: Repository<StudentMark>,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
  ) {}

  async find(userId: number) {
    const student = await this.studentsService.findOneByUserId(userId);
    const marks = await this.studentMarksRepo.findBy({
      student: { id: student.id },
    });
    const highestMarks = await this.studentMarksRepo.query(
      `select * from 
      (select *  from (SELECT SUM(marks) as total_marks, student_id  FROM student_mark GROUP BY student_id) as x order by x.total_marks desc limit 1)h left join student s on h.student_id = s.id;`,
    );

    const subjectHighestMarks = await this.studentMarksRepo.query(
      `select 
      marks,subject_id , student_id,
      s.name, s.enrollment_no, s.dob, s.gender,
      s2.name as subject_name, s2.code as subject_code, s2.description as subject_description
      from (SELECT student_id , subject_id, marks
      FROM(
        SELECT *, ROW_NUMBER()OVER(PARTITION BY subject_id ORDER BY marks DESC) rn
          FROM student_mark
      )X
      WHERE rn = 1)t left join student s on s.id = t.student_id left join subject s2 on s2.id = t.subject_id `,
    );
    return {
      marks,
      highestMarks: this.formatHighestMarks(highestMarks[0]),
      subjectHighestMarks:
        this.mapFormatSubjectHighestMarks(subjectHighestMarks),
    };
  }

  async create(userId: number, createMarksDto: CreateMarksDto) {
    const { subjectId, ...dto } = createMarksDto;

    const student = await this.studentsService.findOneByUserId(userId);
    const subject = await this.subjectsService.findOne(subjectId);

    const mark = await this.studentMarksRepo.findOneBy({
      student: { id: student.id },
      subject: { id: subject.id },
    });

    if (mark) {
      throw new Error('Student already has this subject');
    }

    const newMark = await this.studentMarksRepo.save({
      ...dto,
      student,
      subject,
    });

    return newMark;
  }

  private mapFormatSubjectHighestMarks(data: any[]) {
    return data.map((d) => ({
      marks: d['marks'],
      studentId: d['student_id'],
      name: d['name'],
      enrollmentNo: d['enrollment_no'],
      dob: d['dob'],
      gender: d['gender'],
      subject: {
        id: d['subject_id'],
        name: d['subject_name'],
        code: d['subject_code'],
        description: d['subject_description'],
      },
    }));
  }

  private formatHighestMarks(data: any) {
    return {
      totalMarks: data['total_marks'],
      studentId: data['student_id'],
      name: data['name'],
      enrollmentNo: data['enrollment_no'],
      dob: data['dob'],
      gender: data['gender'],
    };
  }
}
