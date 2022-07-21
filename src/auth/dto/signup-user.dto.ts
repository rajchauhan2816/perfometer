import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO for creating a new user.
 */
export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
