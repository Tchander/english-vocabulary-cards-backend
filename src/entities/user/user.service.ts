import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  availableFields = ['id', 'login'];

  // Register new user
  public async createUser(userData: CreateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { login: userData.login }});

    if (existUser) throw new BadRequestException('This login already exist');

    const salt = await genSalt(10);

    const hashedPassword = await hash(userData.password, salt);

    const newUser = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ login: userData.login })
    const { id, login } = newUser;
    return { id, login, token };
  }

  // Get all users
  public async getAllUsers() {
    return await this.userRepository.find({
      select: this.availableFields as any,
    });
  }

  // Get user by id
  public async getUserData(id: number) {
    return await this.userRepository.findOne({ 
      where: { id },
      select: this.availableFields as any,
    });
  }

  // Update user data
  public async updateUserData(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id }, updateUserDto);

    return await this.userRepository.findOne({ 
      where: { id },
      relations: { categories: true, cards: true },
    });
  }

  // Delete user
  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOneUser(login: string) {
    return await this.userRepository.findOne({ 
      where: { login },
      relations: { categories: true, cards: true },
    });
  }
}
