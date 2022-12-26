import { Injectable } from '@nestjs/common';
import { NewUserDTO, UserDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDocument } from '../auth/schemas/user.schema';
import { AuthWorker } from './worker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly authWorker = new AuthWorker();

  async validateUser(data: UserDTO) {
    const user = await this.userModel.findOne({ login: data.login }).exec();
    if (!user) {
      return {};
    }

    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (user && passwordValid) {
      return this.authWorker.generateToken(user);
    }

    return {};
  }

  async createUser(data: NewUserDTO) {
    const user = await this.userModel.create({
      login: data.login,
      password: await bcrypt.hash(data.password, 7),
      email: data.email,
    });

    return this.authWorker.generateToken(user);
  }
}
