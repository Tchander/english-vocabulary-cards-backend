import { Controller, Get, Post, Put, Delete, Res, Req, Param, ParseIntPipe, Body } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
	) { }

	@Get('/')
	async getAllUsers(
		@Req() req: Request,
		@Res() res: Response,
	) {
		const users = await this.userService.getAllUsers();
		return res.send({ status: 'ok', data: users });
	}


	@Get('/:id')
	async getUser(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		const userData = await this.userService.getUserData(id);
		return res.send({ status: 'ok', data: userData });
	}

	@Post('/')
	async createUser(
		@Body() body: CreateUserDto,
		@Res() res: Response,
	) {
		const data = await this.userService.createUser(body);
		return res.send({ status: 'ok', data });
	}


	@Put('/:id')
	async updateUserField(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateUserDto,
		@Res() res: Response,
	) {
		await this.userService.updateUserData(id, body);
		return res.send({ status: 'ok' });
	}


	@Delete('/:id')
	async deleteUser(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		await this.userService.deleteUser(id);
		return res.send({ status: 'ok' });
	}
}
