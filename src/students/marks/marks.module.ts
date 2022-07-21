import { SubjectsModule } from './../../subjects/subjects.module';
import { StudentsModule } from './../students.module';
import { UsersModule } from './../../users/users.module';
import { StudentMark } from './entities/student-mark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentMark]),
    StudentsModule,
    SubjectsModule,
  ],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
