import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'Signing up';
  }
  login() {
    return 'login in';
  }
}
