import { PickType } from '@nestjs/mapped-types';
import { IsMobilePhone, IsString, Length } from 'class-validator';

export class SendOtpDto {
  @IsMobilePhone('fa-IR', {}, { message: 'mobile number is wrong' })
  mobile: string;
}

export class CheckOtpDto extends PickType(SendOtpDto, ['mobile']) {
  @IsString()
  @Length(5, 5, { message: 'length of code between 5 and 15' })
  code: string;
}
