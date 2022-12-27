import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
