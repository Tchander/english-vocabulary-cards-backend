import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title,
    });

    if (isExist.length) throw new BadRequestException('This category already exist');

    const newCategory = { title: createCategoryDto.title, user: { id } };

    return await this.categoryRepository.save(newCategory);
  }

  async findAllCategories(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id } },
      relations: { cards: true },
    })
  }

  async updateCategoryTitle(id: number, body: UpdateCategoryDto) {
    await this.categoryRepository.update({ id }, body);
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { cards: true },
    })
    return category;
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
