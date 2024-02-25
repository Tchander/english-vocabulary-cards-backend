import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn() // Generated инкрементирует динамически id при добавлении нового пользователя
  id: number;

  @Column({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;
}