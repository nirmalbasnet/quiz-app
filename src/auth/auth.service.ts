import { AuthTokenDto, RefreshTokenDto } from './dto/auth-tokens.dto';
import { TokenService } from './../utils/token-service.utils';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-sign-in.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<{ tokens: AuthTokenDto; user: object }> {
    const { email, password } = authCredentialsSignInDto;

    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenPayload: JwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const accessToken: { token: string; expiresIn: number } =
        await this.tokenService.generateAccessToken(tokenPayload);

      const refreshToken: { token: string; expiresIn: number } =
        await this.tokenService.generateRefreshToken(tokenPayload);

      const tokens: AuthTokenDto = {
        accessToken: accessToken.token,
        accessTokenExpiresIn: accessToken.expiresIn,
        refreshToken: refreshToken.token,
        refreshTokenExpiresIn: refreshToken.expiresIn,
      };

      return { tokens, user };
    } else {
      throw new UnauthorizedException('Invalid Credentials!');
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthTokenDto> {
    const verifyRefreshToken = await this.tokenService.verifyJwtRefreshToken(
      refreshTokenDto.refreshToken,
    );

    const { email } = verifyRefreshToken;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }

    const tokenPayload: JwtPayload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken: { token: string; expiresIn: number } =
      await this.tokenService.generateAccessToken(tokenPayload);

    const refreshToken: { token: string; expiresIn: number } =
      await this.tokenService.generateRefreshToken(tokenPayload);

    const tokens: AuthTokenDto = {
      accessToken: accessToken.token,
      accessTokenExpiresIn: accessToken.expiresIn,
      refreshToken: refreshToken.token,
      refreshTokenExpiresIn: refreshToken.expiresIn,
    };

    return tokens;
  }

  async findUserByEmail(email) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
