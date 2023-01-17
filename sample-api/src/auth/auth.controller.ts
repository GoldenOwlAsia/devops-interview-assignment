import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Body,
  Req,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { merge, pick } from 'lodash';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUser, UserWithTokenResponse } from './auth.interface';
import { userPublicAttrs } from './auth.constant';
import { CurrentUser } from './current-user.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: RequestWithUser): Promise<UserWithTokenResponse> {
    const user = req.user as UserEntity;
    const token = this.authService.createToken(user);
    return merge(pick(user, userPublicAttrs), { token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@CurrentUser('id') currentUserId: string): Promise<UserEntity> {
    return await this.authService.profile(currentUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @HttpCode(200)
  async update(
    @CurrentUser('id') currentUserId: string,
    @Body() updateProfileData: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.authService.update(currentUserId, updateProfileData);
  }
}
