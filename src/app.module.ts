import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@entities/user/user.module';
import { AuthModule } from '@entities/auth/auth.module';
import { CategoryModule } from '@entities/category/category.module';
import { CardModule } from '@entities/cards/card.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UserModule,
    AuthModule,
    CategoryModule,
    CardModule,
  ],
})
export class AppModule {}
