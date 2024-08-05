import { Controller, Post } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  @Post('/send-otp')
  sendOtp() {}

  @Post('/check-otp')
  checkOtp() {}
}
