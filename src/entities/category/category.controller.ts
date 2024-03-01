import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { JwtAuthGuard } from '@entities/auth/guards/jwt-auth.guard';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	async createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
		return this.categoryService.createCategory(createCategoryDto, +req.user.id);
	}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	async findAlLCategories(@Req() req) {
		return this.categoryService.findAllCategories(+req.user.id);
	}
}
