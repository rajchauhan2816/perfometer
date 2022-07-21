import { CreateMarksDto } from './dto/create-marks.dto';
import { AuthenticatedUser } from './../../auth/auth.interfaces';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MarksService } from './marks.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('student/marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Get()
  find(@CurrentUser() user: AuthenticatedUser) {
    return this.marksService.find(user.userId);
  }

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createMarksDto: CreateMarksDto,
  ) {
    return this.marksService.create(user.userId, createMarksDto);
  }
}
