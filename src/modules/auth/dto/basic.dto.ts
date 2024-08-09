import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsMobilePhone, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail({ host_whitelist: ['gmail.com', 'yahoo.com'] })
  email: string;
  @IsString()
  @Length(5, 8)
  password: string;
  @IsString()
  @Length(5, 8)
  confirm_password: string;
  @IsMobilePhone('fa-IR', {})
  mobile: string;
}

export class LoginDto extends PickType(SignUpDto, ['email', 'password']) {}
