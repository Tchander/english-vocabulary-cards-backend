import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Login must be more then 3 symbols' })
  login: string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password must be more then 4 symbols' })
  password: string;
}
