import { AccessTokenExpireException } from '../exceptions/access-token-expired.exception';
import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // canActivate(context: ExecutionContext): boolean {
  //   const roles = this.reflector.get<string[]>('roles', context.getHandler());

  //   if (!roles) {
  //     return true;
  //   }
  //   const request = context.switchToHttp().getRequest();

  //   if (!request.headers?.authorization) {
  //     return false;
  //   }

  //   // const token = request.headers.authorization.substring(
  //   //   request.headers.authorization.lastIndexOf(' '),
  //   // );

  //   const user = request.user;

  //   return false;
  // }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    if (info && info.name && info.name === 'TokenExpiredError') {
      throw new AccessTokenExpireException();
    }

    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'access_token_expired',
        message: 'Access token expired',
      });
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (
      roles &&
      roles[0] &&
      user.role.toLowerCase() !== roles[0].toLowerCase()
    ) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'unauthorized_resource',
        message: 'The requested resource is restricted',
      });
    }

    return user;
  }
}
