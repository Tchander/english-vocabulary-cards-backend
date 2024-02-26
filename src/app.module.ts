import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@entities/user/user.module';
import { AuthModule } from '@entities/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
