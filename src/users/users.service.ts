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

  findOne(username: string) {
    return this.usersRepo.findOneBy({ username });
  }
}
