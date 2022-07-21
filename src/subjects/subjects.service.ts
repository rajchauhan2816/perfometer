import { SubjectNotFoundError } from './../core/errors/subject-not-found.error';
import { SubjectCodeAlreadyExistsError } from './../core/errors/subject-code-already-exists.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private subjectsRepo: Repository<Subject>,
  ) {}
  async create(createSubjectDto: CreateSubjectDto) {
    try {
      return await this.subjectsRepo.save(createSubjectDto);
    } catch (error) {
      throw new SubjectCodeAlreadyExistsError();
    }
  }

  findAll() {
    return this.subjectsRepo.find();
  }

  async findOne(id: number) {
    const subject = await this.subjectsRepo.findOneBy({ id });

    if (!subject) {
      throw new SubjectNotFoundError();
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    // update the subject with the new data and return the updated subject\
    const response = await this.subjectsRepo.update(id, updateSubjectDto);
    if (!response.affected) {
      throw new SubjectNotFoundError();
    }
    return this.subjectsRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const response = await this.subjectsRepo.delete(id);
    if (!response.affected) {
      throw new SubjectNotFoundError();
    }
    return 'Subject deleted successfully';
  }
}
