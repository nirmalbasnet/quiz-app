import { RefreshTokenDto, AuthTokenDto } from './dto/auth-tokens.dto';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-sign-in.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../models/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    try {
      return this.authService.signUp(authCredentialsDto);
    } catch (err) {
      throw err;
    }
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<any> {
    try {
      return this.authService.signIn(authCredentialsSignInDto);
    } catch (err) {
      throw err;
    }
  }

  @Post('/refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthTokenDto> {
    try {
      return this.authService.refreshToken(refreshTokenDto);
    } catch (error) {
      throw error;
    }
  }
}
