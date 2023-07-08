import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
