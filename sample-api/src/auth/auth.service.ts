import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  async profile(userId: string): Promise<UserEntity> {
    return this.userService.getOne(userId);
  }

  async update(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<UserEntity> {
    return this.userService.update(userId, updateUserDto);
  }

  createToken(user: UserEntity): string {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
