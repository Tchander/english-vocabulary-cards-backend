import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async createCard(
    createCardDto: CreateCardDto,
    userId: number,
    categoryId: number,
  ) {
    const isExist = await this.cardRepository.findBy({
      user: { id: userId },
      category: { id: categoryId },
      label: createCardDto.label,
    });

    if (isExist.length)
      throw new BadRequestException('This card already exist');

    return await this.cardRepository.save({
      label: createCardDto.label,
      description: createCardDto.description,
      transcription: createCardDto.transcription,
      examples: createCardDto.examples,
      user: { id: userId },
      category: { id: categoryId },
    });
  }

  async findAllCards(id: number) {
    return await this.cardRepository.find({ where: { user: { id } } });
  }

  async updateCardFields(id: number, updateCardDto: UpdateCardDto) {
    await this.cardRepository.update({ id }, updateCardDto);
    return await this.cardRepository.findOne({ where: { id } });
  }

  async deleteCard(id: number) {
    return await this.cardRepository.delete(id);
  }
}
