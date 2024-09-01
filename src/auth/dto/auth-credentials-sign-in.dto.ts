import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsSignInDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Your Email',
    default: 'john@email.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Your Password',
    default: 'password',
  })
  password: string;
}
