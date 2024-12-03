import {
  Controller,
  UseGuards,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const user = await this.authService.login(req.user);

    res.cookie('user_token', this.jwtService.sign(user), {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    return {};
  }

  @Get('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.cookie('user_token', '', { expires: new Date(Date.now()) });
    return {};
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
