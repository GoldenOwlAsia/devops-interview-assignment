import { Request } from 'express';
import { UserEntity } from '../user/user.entity';

export interface JwtPayload {
  id: string;
  email: string;
}

export interface UserWithTokenResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface RequestWithUser extends Request {
  user: UserEntity;
}
