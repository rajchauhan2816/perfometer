import { UserNotFoundError } from './../core/errors/user-not-found.error';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UsernameAlreadyExistsError,
  UsernameNotFoundError,
} from 'src/core/errors';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}
  async create(username: string, password: string) {
    try {
      return await this.usersRepo.save({ username, password });
    } catch (error) {
      throw new UsernameAlreadyExistsError();
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.usersRepo.findOneBy({ username });
    } catch (error) {
      throw new UserNotFoundError();
    }
  }

  async findOne(id: number) {
    try {
      return await this.usersRepo.findOneBy({ id });
    } catch (error) {
      throw new UserNotFoundError();
    }
  }
}
