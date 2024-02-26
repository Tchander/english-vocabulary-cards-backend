import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@entities/user/user.module';


@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}