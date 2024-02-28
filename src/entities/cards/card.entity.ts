import { Category } from '@entities/category/category.entity';
import { User } from '@entities/user/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'


@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn({ name: 'card_id' })
  id: number;

  @Column({ name: 'label', type: 'varchar' })
  label: string;

  @Column({ name: 'transcription', type: 'varchar' })
  transcription: string;

  @Column({ name: 'examples', type: 'varchar' })
  examples: string[];

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.cards)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}