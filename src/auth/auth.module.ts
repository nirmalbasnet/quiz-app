import { ConfigModule } from '@nestjs/config';
import { TokenService } from './../utils/token-service.utils';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('ACCESS_TOKEN_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, TokenService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
