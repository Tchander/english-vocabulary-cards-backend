import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserData(id);
  }

  @Post('/')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Put('/:id')
  async updateUserField(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.updateUserData(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
