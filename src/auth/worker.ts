import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthWorker {
  jwtService: JwtService = new JwtService({
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: '24h',
    },
  });

  generateToken(user: any) {
    const payload = {
      login: user.login,
      userid: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  parseToken(token: string) {
    const user = this.jwtService.verify(token);
    return user;
  }
}
