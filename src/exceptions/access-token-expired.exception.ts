import { UnauthorizedException } from '@nestjs/common';

export class AccessTokenExpireException extends UnauthorizedException {
  constructor() {
    super('The access token has expired');
  }
}
