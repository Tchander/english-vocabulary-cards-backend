import { Card } from '@entities/cards/card.entity';
import { Category } from '@entities/category/category.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn() // Generated инкрементирует динамически id при добавлении нового пользователя
  id: number;

  @Column({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}