import { Card } from '@entities/cards/card.entity';
import { User } from '@entities/user/user.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  user?: User;

  @IsOptional()
  cards?: Card[];
}
