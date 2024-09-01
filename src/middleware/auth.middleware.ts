import { AuthService } from './../auth/auth.service';
import { TokenService } from './../utils/token-service.utils';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.tokenService.verifyJwtAccessToken(token);
        const user = await this.authService.findUserByEmail(decoded.email);

        if (user) {
          req.user = user;
          next();
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('No token found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  }
}
