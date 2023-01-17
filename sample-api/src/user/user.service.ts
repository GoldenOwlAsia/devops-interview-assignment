import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async getOne(id: string): Promise<UserEntity> {
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    let user = await this.findByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: {
            email: 'email is already exists',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return user;
  }

  async update(
    id: string,
    newValue: Partial<UpdateUserDto>,
  ): Promise<UserEntity> {
    const user = await this.getOne(id);
    const { currentPassword, ...updatedData } = newValue;
    const matchedPassword = await user.comparePassword(currentPassword || '');

    if (!matchedPassword) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: {
            currentPassword: 'currentPassword is correct',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.entries(updatedData).forEach(([key, value]) => {
      user[key] = value;
    });
    await this.userRepository.save(user);

    return user;
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async authenticate(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);

    if (user && (await user.comparePassword(password))) {
      return user;
    }

    return null;
  }
}
