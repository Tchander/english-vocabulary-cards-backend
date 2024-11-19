import { Category } from '@entities/category/category.entity';
import { User } from '@entities/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn({ name: 'card_id' })
  id: number;

  @Column({ name: 'label', type: 'varchar' })
  label: string;

  @Column({
    name: 'transcription',
    type: 'varchar',
    array: true,
    nullable: true,
  })
  transcription: string[] | null;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'examples', type: 'varchar', array: true, nullable: true })
  examples: string[] | null;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
