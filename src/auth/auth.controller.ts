import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService.login();
  }
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup();
  }
  @Post('login')
  login() {
    return this.authService.login();
  }
}
