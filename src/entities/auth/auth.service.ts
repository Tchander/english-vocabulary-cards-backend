import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from '@entities/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findOne(login);
    const passwordIsMatch = await compare(password, user.password);

    if (user && passwordIsMatch) {
      return user;
    }
    throw new BadRequestException('Login or password are incorrect');
  }
}