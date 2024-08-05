import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entity/otp.entity';
import { SendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
  ) {}

  async createOtpForUser(user: UserEntity) {
    const expires_In = new Date(new Date().getTime() + 1000 * 60 * 2);
    const code = String(randomInt(10000, 99999));

    let otp = await this.otpRepository.findOneBy({ userId: user.id });
    if (otp) {
      otp.code = code;
      otp.expires_In = expires_In;
    } else {
      otp = this.otpRepository.create({
        code,
        expires_In,
        userId: user.id,
      });
    }
    otp = await this.otpRepository.save(otp);
    user.otpId = otp.id;
    await this.userRepository.save(user);
  }

  async sendOtp(data: SendOtpDto) {
    const { mobile } = data;
    let user = await this.userRepository.findOneBy({ mobile });

    if (!user) {
      user = this.userRepository.create({ mobile });
      user = await this.userRepository.save(user);
    }
    await this.createOtpForUser(user);
  }
}
