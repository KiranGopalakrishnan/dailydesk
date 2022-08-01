import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserPostDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
