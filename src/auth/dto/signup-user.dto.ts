import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
