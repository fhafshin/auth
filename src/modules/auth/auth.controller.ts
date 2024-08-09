import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckOtpDto, SendOtpDto } from './dto/otp.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/send-otp')
  sendOtp(@Body() data: SendOtpDto) {
    return this.authService.sendOtp(data);
  }

  @Post('/check-otp')
  checkOtp(@Body() data: CheckOtpDto) {
    return this.authService.checkOtp(data);
  }
}
