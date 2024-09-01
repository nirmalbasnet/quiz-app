import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Your Name',
    default: 'John Doe',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Your Email',
    default: 'john@email.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase, one lowercase, one special character, one number and minimum eight characters long',
  })
  @ApiProperty({
    description: 'Your Password',
    default: 'Password1',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Your Mobile',
    default: '9815730989',
  })
  mobile: string;

  @ApiPropertyOptional({
    description: 'Your Address',
    default: 'Bell Street, Brisbane, Australia',
  })
  address: string;

  @ApiPropertyOptional({
    description: 'Your City',
    default: 'Brisbane',
  })
  city: string;
}
