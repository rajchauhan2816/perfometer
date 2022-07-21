import { StudentAlreadyExistsError } from './../core/errors/student-already-exists.error';
import { StudentNotFoundError } from './../core/errors/student-not-found.error';
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

    try {
      return await this.studentsRepo.save({ ...createStudentDto, user });
    } catch (error) {
      throw new StudentAlreadyExistsError();
    }
  }

  findAll() {
    return this.studentsRepo.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const student = await this.studentsRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!student) {
      throw new StudentNotFoundError();
    }
    return student;
  }

  async findOneByEnrollment(enrollmentNo: string) {
    const student = await this.studentsRepo.findOne({
      where: { enrollmentNo },
      relations: { user: true },
    });
    if (!student) {
      throw new StudentNotFoundError();
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    // update the subject with the new data and return the updated subject\
    const response = await this.studentsRepo.update(id, updateStudentDto);
    if (!response.affected) {
      throw new StudentNotFoundError();
    }
    return this.studentsRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const response = await this.studentsRepo.delete(id);
    if (!response.affected) {
      throw new StudentNotFoundError();
    }
    return 'Student deleted successfully';
  }
}
