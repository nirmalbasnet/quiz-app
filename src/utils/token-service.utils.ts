import { JwtPayload } from './../auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenExpireException } from 'src/exceptions/access-token-expired.exception';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public generateAccessToken = async (
    tokenPayload: JwtPayload,
  ): Promise<any> => {
    try {
      const ACCESS_TOKEN_EXPIRES_IN = this.configService.get(
        'ACCESS_TOKEN_EXPIRES_IN',
      );
      const JWT_SECRET = this.configService.get('ACCESS_TOKEN_SECRET');
      const token = this.jwtService.sign(tokenPayload, {
        secret: JWT_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      return {
        token,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      };
    } catch (err) {
      throw err;
    }
  };

  public generateRefreshToken = async (
    tokenPayload: JwtPayload,
  ): Promise<any> => {
    try {
      const REFRESH_TOKEN_EXPIRES_IN = this.configService.get(
        'REFRESH_TOKEN_EXPIRES_IN',
      );
      const JWT_SECRET = this.configService.get('REFRESH_TOKEN_SECRET');
      const token = this.jwtService.sign(tokenPayload, {
        secret: JWT_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      });

      return {
        token,
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      };
    } catch (err) {
      throw err;
    }
  };

  async verifyJwtRefreshToken(refreshToken: string): Promise<any> {
    try {
      const JWT_SECRET = this.configService.get('REFRESH_TOKEN_SECRET');
      return this.jwtService.verify(refreshToken, {
        secret: JWT_SECRET,
        ignoreExpiration: false,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyJwtAccessToken(accessToken: string): Promise<any> {
    try {
      const JWT_SECRET = this.configService.get('ACCESS_TOKEN_SECRET');
      return this.jwtService.verify(accessToken, {
        secret: JWT_SECRET,
        ignoreExpiration: false,
      });
    } catch (error) {
      if (error?.message && error?.message === 'jwt expired') {
        throw new AccessTokenExpireException();
      }
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
