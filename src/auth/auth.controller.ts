import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO, UserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private logger: Logger = new Logger('AuthController');

  @Post('/signin')
  async signIn(@Body() body: UserDTO) {
    const user = await this.authService.validateUser({
      login: body.login,
      password: body.password,
    });
    if (!user) {
      return {};
    }
    return user;
  }

  @Post('/signup')
  async signUp(@Body() body: NewUserDTO) {
    const user = await this.authService.createUser({
      login: body.login,
      password: body.password,
      email: body.email,
    });
    if (!user) {
      return {};
    }
    return user;
  }
}
