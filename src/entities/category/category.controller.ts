import { Controller, Post, Get, Patch, Delete, Body, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { JwtAuthGuard } from '@entities/auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	async createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
		return await this.categoryService.createCategory(createCategoryDto, +req.user.id);
	}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	async findAlLCategories(@Req() req) {
		return await this.categoryService.findAllCategories(+req.user.id);
	}

	@Patch('/:id')
	@UseGuards(JwtAuthGuard)
	async updateCategoryTitle(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCategoryDto) {
		return await this.categoryService.updateCategoryTitle(id, body);
	}

	@Delete('/:id')
	@UseGuards(JwtAuthGuard)
	async deleteCategory(@Param('id', ParseIntPipe) id: number) {
		await this.categoryService.deleteCategory(id);
	}
}
