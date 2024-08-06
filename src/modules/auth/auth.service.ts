import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entity/otp.entity';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
  ) {}

  private async createOtpForUser(user: UserEntity) {
    const expires_In = new Date(new Date().getTime() + 1000 * 60 * 2);
    const code = String(randomInt(10000, 99999));

    let otp = await this.otpRepository.findOneBy({ userId: user.id });
    if (otp) {
      if (otp.expires_In > new Date()) {
        throw new BadRequestException('otp code not expires time');
      }
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
    return {
      message: 'successfully',
    };
  }

  async checkOtp(data: CheckOtpDto) {
    const { code, mobile } = data;
    const user = await this.userRepository.findOne({
      where: { mobile },
      relations: { otp: true },
    });

    const now = new Date();
    if (!user || !user?.otp)
      throw new UnauthorizedException('not found account');

    const otp = user.otp;
    if (otp?.code !== code)
      throw new UnauthorizedException('otp code is incorrect');

    if (otp.expires_In < now)
      throw new UnauthorizedException('otp code is expired');

    if (user.mobile_verify) {
      user.mobile_verify = true;
      await this.userRepository.save(user);
    }

    return { message: 'you logged-in successfully' };
  }
}
