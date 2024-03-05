import { Body, Param, Controller, Post, Get, Put, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CardService } from './card.service';
import { JwtAuthGuard } from '@entities/auth/guards/jwt-auth.guard';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

@Controller('card')
export default class CardController {
	constructor(private readonly cardService: CardService) {}

	@Post('/:categoryId')
	@UseGuards(JwtAuthGuard)
	async createCard(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() createCardDto: CreateCardDto, @Req() req) {
		return await this.cardService.createCard(createCardDto, +req.user.id, categoryId);
	}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	async findAllCards(@Req() req) {
		return await this.cardService.findAllCards(+req.user.id);
	}

	@Put('/:id')
	@UseGuards(JwtAuthGuard)
	async updateCardFields(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCardDto) {
		return await this.cardService.updateCardFields(id, body);
	}

	@Delete('/:id')
	@UseGuards(JwtAuthGuard)
	async deleteCard(@Param('id', ParseIntPipe) id: number) {
		await this.cardService.deleteCard(id);
	}
}
