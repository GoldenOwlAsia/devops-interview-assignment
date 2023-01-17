import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Match } from '../../shared/class-validator/match.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password')
  readonly passwordConfirmation: string;
}
