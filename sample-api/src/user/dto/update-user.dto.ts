import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Match } from '../../shared/class-validator/match.decorator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @Match('password')
  @IsOptional()
  readonly passwordConfirmation: string;

  @IsString()
  @IsNotEmpty()
  readonly currentPassword: string;
}
