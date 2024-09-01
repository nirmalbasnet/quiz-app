import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthTokenDto {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
