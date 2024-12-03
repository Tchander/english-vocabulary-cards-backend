import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from '@entities/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return {
      data: await this.userService.getAllUsers(),
    };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserData(id);
  }

  @Post('/')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateUserField(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.updateUserData(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
