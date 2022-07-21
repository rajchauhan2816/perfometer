import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentsRepo: Repository<Student>,
    private userService: UsersService,
  ) {}
  async create(userId: number, createStudentDto: CreateStudentDto) {
    const user = await this.userService.findOne(userId);
    return this.studentsRepo.save({ ...createStudentDto, user });
  }

  findAll() {
    return this.studentsRepo.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.studentsRepo.findOneBy({ id });
  }

  findOneByEnrollment(enrollmentNo: string) {
    return this.studentsRepo.findOneBy({ enrollmentNo });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    // update the subject with the new data and return the updated subject\
    const response = await this.studentsRepo.update(id, updateStudentDto);
    if (!response.affected) {
      // throw new SubjectNotFoundError();
    }
    return this.studentsRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const response = await this.studentsRepo.delete(id);
    if (!response.affected) {
      // throw new SubjectNotFoundError();
    }
    return 'Subject deleted successfully';
  }
}
