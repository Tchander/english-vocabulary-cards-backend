import { UnauthorizedException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from '@entities/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserData } from '@entities/user/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findOneUser(login);
    const passwordIsMatch = await compare(password, user.password);

    if (user && passwordIsMatch) {
      return { login, id: user.id, categories: user.categories, cards: user.cards };
    }
    throw new UnauthorizedException();
  }

  async login(user: UserData) {
    const { id, login, categories, cards } = user;
    return {
      id,
      login,
      categories,
      cards,
      token: this.jwtService.sign({ id, login }),
    };
  }

  async getProfile(user: UserData) {
    const { id, login, categories, cards } = await this.userService.findOneUser(user.login);
    return {
      id,
      login,
      categories,
      cards,
    };
  }
}