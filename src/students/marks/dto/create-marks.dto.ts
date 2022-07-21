import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMarksDto {
  @IsNumber()
  @IsPositive()
  maxMarks: number;

  @IsNumber()
  @IsPositive()
  marks: number;

  @IsNumber()
  @IsPositive()
  subjectId: number;

  @IsString()
  @IsNotEmpty()
  year: string;
}
