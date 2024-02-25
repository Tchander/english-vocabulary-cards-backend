import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { UserData } from './types';

type AvailableFields = Omit<UserData, 'password'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  // availableFields: keyof UserData = ['login'];
  availableFields = ['login'];

  // Filter body's fields from abailable fields list
  private filterFields(body: UserData) {
    const filteredBody: UserData = undefined;

    Object.keys(body).filter((k) => {
      if (this.availableFields.includes(k)) {
        filteredBody[k] = body[k];
      }
    });

    return filteredBody;
  }

  // Register new user
  public async createUser(userData: UserData) {
    const salt = await genSalt(10);

    const hashedPassword = await hash(userData.password, salt);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
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
  public async updateUserData(id: number, body: UserData) {
    return await this.userRepository.update(
      { id },
      this.filterFields(body),
    );
  }

  // Delete user
  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOne(login: string) {
    return await this.userRepository.findOne({
      where: { login },
      select: this.availableFields as any,
    });
  }
}
