import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const [bearer, token] = (request.headers.authorization || '').split(' ');

    const hasBearer = bearer && bearer.toLowerCase() === 'bearer';

    if (!hasBearer || !token) {
      throw new BadRequestException({ message: 'Invalid token' });
    }

    await this.authService.verifyToken(token);

    return true;
  }
}
